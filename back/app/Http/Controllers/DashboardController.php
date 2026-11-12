<?php
namespace App\Http\Controllers;

use App\Models\DashboardValueHistory;
use App\Models\PortfoliosFinancial;
use App\Models\PortfoliosMetric;
use App\Models\PortfolioValueHistory;
use App\Models\Symbol;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DashboardController extends Controller
{
    // GET /api/portfolios?offset=0&take=10&search=&status=active
    public function index()
    {
        // return Cache::remember('dashboard', 300, function () {
        return $this->buildDashboardData();
        // });
    }

    public function buildDashboardData()
    {
        $active = fn($q) => $q->active();

        // ========= Summary =========
        $metrics = PortfoliosMetric::whereHas('portfolio', $active)
            ->selectRaw("
            SUM(portfolio_value) as total_value,
            SUM(manager_share) as total_manager_share,
            SUM(CASE WHEN return_amount >= 0 THEN 1 ELSE 0 END) as pos_count,
            SUM(CASE WHEN return_amount < 0 THEN 1 ELSE 0 END) as neg_count,
            SUM(CASE WHEN return_amount < 0 THEN return_amount ELSE 0 END) as total_value_negs
            ")->first();

        $totalInitial = PortfoliosFinancial::whereHas('portfolio', $active)
            ->sum('initial_capital');
            

        $totalReturn = $metrics->total_value - $totalInitial;

        $summary = [
            'total_value'          => (float) $metrics->total_value,
            'total_value_negs'     => (float) $metrics->total_value_negs,
            'total_initial'        => (float) $totalInitial,
            'total_return'         => (float) $totalReturn,
            'total_return_percent' => $totalInitial > 0
                ? round(($totalReturn / $totalInitial) * 100, 2)
                : 0,
            'portfolioStatus'      => [
                'pos' => (int) $metrics->pos_count,
                'neg' => (int) $metrics->neg_count,
            ],
            'total_manager_share'  => (float) $metrics->total_manager_share,
        ];

        // ========= Top 5 Portfolios =========
        $topPortfolios = PortfoliosMetric::whereHas('portfolio', $active)
            ->with('portfolio:id,name')
            ->orderByDesc('return_percent')
            ->limit(5)
            ->get();

        $portfolioIds = $topPortfolios->pluck('portfolio_id');

        $charts = PortfolioValueHistory::whereIn('portfolio_id', $portfolioIds)
            ->get()
            ->groupBy('portfolio_id')
            ;

        $topPortfolios = $topPortfolios->map(fn($p) => [
            'values'     => $p,
            'chart_data' => $charts[$p->portfolio_id]->slice(count($charts[$p->portfolio_id])-30)->values() ?? [],
        ]);

        // ========= Top 5 Symbols =========
        $topSymbols = Symbol::whereHas('holdings')
            ->withSum('holdings as total_quantity', 'quantity')
            ->get()
            ->map(fn($s) => [
                'code'           => $s->code,
                'name'           => $s->name,
                'quantity'       => $s->total_quantity,
                'value'          => round($s->total_quantity * ($s->last_price / 10)),
                'last_price_pct' => $s->last_price_pct,
            ])->sortByDesc('value')->values();

        $total_symbol_values = $topSymbols->reduce(fn($sum, $i) => $sum + $i['value'], 0);
        $top_5_symbols       = $topSymbols->map(function ($symbol) use ($total_symbol_values) {
            return $symbol += ['percent' => round($symbol['value'] / $total_symbol_values * 100, 1)]
            ;
        })->slice(0, 5);


        $trend = DashboardValueHistory::orderByDesc('created_at')->limit(2)->get()->values();
        $trend = (float)$trend[0]['return_'] >= (float)$trend[1]['return_'] ? 'up' : 'down';
        // ========= Dashboard Chart =========

        return response()->json([
            'summary'        => $summary,
            'trend'          => $trend,
            'top_portfolios' => $topPortfolios,
            'top_symbols'    => $top_5_symbols,
        ]);
    }

    public function fetchDashboardChart(Request $request)
    {
        $timeframe = $request->query('range', '1M'); // 1M | 3M | 6M | 1Y

        // تعیین بازه زمانی
        $startDate = match ($timeframe) {
            '1M'    => 30,
            '3M'    => 90,
            '6M'    => 180,
            '1Y'    => 365,
            default => 30,
        };

        // گرفتن دیتای نمودار از دیتابیس
        $values = DashboardValueHistory::
            orderBy('created_at')
            ->get(['value', 'created_at']);

        // اگر دیتای ذخیره شده نداریم → fallback محاسبه مستقیم
        if ($values->isEmpty()) {
            return response()->json([
                'data'    => [],
                'message' => 'No chart data found',
            ]);
        }

        // تبدیل دیتا به فرمت مناسب فرانت
        $chartData = $values->slice(count($values) - $startDate)->map(function ($item) {
            return [
                'date'  => $item->created_at->format('Y-m-d'),
                'value' => (int) $item->value,
            ];
        });

        return response()->json([
            'timeframe' => $timeframe,
            'data'      => $chartData->values(),
        ]);
    }

    public function fetchDueDateList()
    {
        $active  = fn($q) => $q->active();
        $symbols = PortfoliosFinancial::whereHas('portfolio', $active)->with('portfolio:id,name')->where('due_date', '<=', now()->toDateString())->orderBy('due_date','asc')->join('portfolios_metrics','portfolios_metrics.portfolio_id','=','portfolios_financials.portfolio_id')->get(['portfolios_financials.portfolio_id', 'portfolios_financials.due_date','portfolios_metrics.return_amount']);
       
        return response()->json($symbols);
    }

    public function updateDueDateList($id)
    {
        try {
            //code...
            $portfolio           = PortfoliosFinancial::where('portfolio_id', $id)->first();
            $new_due_date = Carbon::parse($portfolio->due_date)->addMonths(3);
            while( $new_due_date < now())
               $new_due_date = Carbon::parse($new_due_date)->addMonths(3);
            $portfolio->due_date = $new_due_date->toDateString();
            $portfolio->save();
            return response()->json("تمدید سبد با موفقیت انجام شد");
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json('تمدید سبد ناموفق!' . $id);

        }

    }

    /* ---------- Helpers ---------- */

    protected function validatePayload(Request $request)
    {
        return $request->validate([
            'name'                => 'required|string|max:191',
            'national_code'       => 'required|string|max:50',
            'phone'               => 'nullable|string|max:50',
            'address'             => 'nullable|string',
            'broker_link'         => 'nullable|string',
            'broker_username'     => 'nullable|string',
            'broker_password'     => 'nullable|string',
            'initial_capital'     => 'required|numeric',
            'commission_pct'      => 'required|numeric',
            'contract_date'       => 'required|date',
            'guarantee_type'      => ['nullable', Rule::in(['promissory', 'quarterly'])],
            'dividend'            => 'nullable|numeric',
            'withdrawals'         => 'nullable|numeric',
            'holdings'            => 'nullable|array',
            'holdings.*.symbol'   => 'required_with:holdings|string',
            'holdings.*.quantity' => 'required_with:holdings|numeric|min:0',
        ]);
    }

    public function getUserProfile($username){
       
            $data = User::where("username",$username)->first();
        return response()->json($data);
         
    }
    public function updateUserProfile(Request $request,$username){
    try {
        //code...
         $user = User::where('username',$username)->first();
         $user->name = $request->name;
         $user->username = $request->username;
         $user->password = bcrypt($request->password);
         $user->save();
        return response()->json('update successfull - '.$username);

    } catch (\Throwable $th) {
        //throw $th;
         return response()->json('update failed');

    }   
   
    }

}
