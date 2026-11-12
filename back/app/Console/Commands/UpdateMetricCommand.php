<?php
namespace App\Console\Commands;

use App\Models\Symbol;
use App\Models\PortfolioHolding;
use App\Models\Portfolio;
use App\Models\PortfolioValueHistory;
use App\Models\DashboardValueHistory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Morilog\Jalali\Jalalian;
use Carbon\Carbon;

class UpdateMetricCommand extends Command
{
    protected $signature   = 'update:metrics';
    protected $description = 'دریافت و بروزرسانی اطلاعات قیمتی تمام سهام از API';

    public function getData()
    {
        $baseUrl = env("SYMBOLS_URL");

        try {
            $response = Http::timeout(10)->get($baseUrl);

            if ($response->successful()) {
                $symbols = $response->json();
                if (empty($symbols) || count($symbols) <= 1) {
                    return null;
                }
                $gregorian = null;
                foreach ($symbols as $data) {
                    if ($data['namad_code'] == 'IRT1AHRM0001') {

                        $normalJalali = normalJalaliDate($data['last_trade_date']);
                        if ($normalJalali) {
                            $jalaliDate = Jalalian::fromFormat('Y/m/d', $normalJalali);
                            $gregorian  = $jalaliDate->toCarbon();
                        }
                        break;
                    }
                }

                if (! $gregorian || ! $gregorian->isToday()) {

                    return null;
                }

                return $symbols;
            } else {
                return null;
            }
        } catch (\Exception $e) {

            return null;
        }
    }

    public function checkValidData($symbols)
    {

    }
    public function handle()
    {

        // $symbols = $this->getData();

        if ($symbols) {
            $portfolios = Portfolio::all();
            $total_value_history=0;
            $total_initial_capital=0;

            foreach ($portfolios as $portfolio) {
                $holdings = $portfolio->holdings()->get();
                $value=0;
                foreach($holdings as $holding){
                  $value +=  round($holding->symbol->last_price / 10 * $holding->quantity) ;
                }
                $total_value = $value + $portfolio->financial->dividend + $portfolio->financial->withdrawals;
                $return_amount = $total_value - $portfolio->financial->initial_capital;
                $return_percent = $return_amount / $portfolio->financial->initial_capital * 100;
                $manager_share = $return_amount > 0 ? round(($portfolio->financial->commission_pct / 100) * $return_amount) : 0;
                $portfolio->metrics->update([
                    'portfolio_value' => $total_value,
                    'return_amount' => $return_amount,
                    'return_percent' => $return_percent,
                    'manager_share' => $manager_share

                ]);
                $portfolio->valueHistories->create([
                    'portfolio_id' => $portfolio->id,
                    'date' => now()->toDateString(),
                    'value' => $total_value,
                    'return' => $return_percent
                ]);

                $total_value_history += $total_value;
                $total_initial_capital += $portfolio->financial->initial_capital;
            }

            $total_value_return = round(($total_value_history - $total_initial_capital)/$total_initial_capital * 100,2);
            DashboardValueHistory::create([
                'value' => $total_value_history,
                'return_' => $total_value_return
            ]);

            }
           
// $file = fopen(__DIR__.'\یونس طولابی.csv', 'r');
// $i=0;
// $id=128;
// while (($line = fgetcsv($file)) !== FALSE) {     
//     PortfolioValueHistory::create([
//         'portfolio_id' => $id,
//         'value' => $line[1],
//         'return' => 10,
//         'date' => now()
        
//         ]);
//         $i++;
//         }
//         fclose($file);


// // $i=586;
// $values = PortfolioValueHistory::where('portfolio_id',$id)->get();
// foreach($values as $value){
//     $value->date = now()->subDays($i);
//     $value->save();
//     $i--;
//     }

    }
}
