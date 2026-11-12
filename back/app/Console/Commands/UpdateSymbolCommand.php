<?php
namespace App\Console\Commands;

use App\Models\Symbol;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Morilog\Jalali\Jalalian;

class UpdateSymbolCommand extends Command
{
    protected $signature   = 'update:symbols';
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

        $symbols = $this->getData();

        if ($symbols) {
            foreach ($symbols as $symbol) {
                Symbol::updateOrCreate(
                    ['code' => $symbol['namad_code']], // شرط پیدا کردن رکورد
                    [
                        'name'           => $symbol['name'],
                        'last_price'     => $symbol['close_price'],
                        'last_price_pct' => $symbol['close_price_change_percent'],
                    ]
                );
            }

        }

    }
}
