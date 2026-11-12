<?php
namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\PortfolioHolding;
use App\Models\PortfoliosFinancial;
use App\Models\PortfoliosMetric;
use App\Models\PortfolioValueHistory;
use App\Models\Symbol;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PortfolioController extends Controller
{
    // GET /api/portfolios?offset=0&take=10&search=&status=active
    public function index(Request $request)
    {
       $params = $request->input('params',[]);
        $offset = (int) $params['offset'];
        $take   = (int) $params['take'];
        $search = $params['search'];
        $status = $params['status']; // active | inactive | null => all
        $sortby = $params['sortBy'];
        $order  = $params['order'];


        $allowedSorts = ['return_percent', 'return_amount', 'manager_share', 'portfolio_value','due_date'];

        if (! in_array($sortby, $allowedSorts)) {
            $sortby = 'return_percent';
        }

        $query = Portfolio::query()->with([
                'financial',
                'metrics',
                'holdings.symbol',
                'valueHistories' => function ($q) {
                    $q->orderByDesc('date')->take(30);
                },
            ])
            ->orderBy($sortby === 'due_date' ? Portfoliosfinancial::select($sortby)->whereColumn('portfolio_id','portfolios.id')->limit(1) : PortfoliosMetric::select($sortby)->whereColumn('portfolio_id','portfolios.id')->limit(1), $order);
            // ->select('portfolios.*'); // خیلی مهم

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
                // ->orWhere('national_code', 'LIKE', "%{$search}%")
                // ->orWhere('phone', 'LIKE', "%{$search}%");
            });
        }

        if ($status === 'active') {
            $query->where('is_active', true);
        }

        if ($status === 'inactive') {
            $query->where('is_active', false);
        }

        $total = $query->count();
        $data  = $query->skip($offset)->take($take)->get();

        return response()->json(['data' => $data, 'total' => $total]);
    }

    // GET /api/portfolios/{id}
    public function show($id)
    {
        $portfolio = Portfolio::with(['financial', 'metrics', 'holdings.symbol','valueHistories' => function($q){
            return $q->orderByDesc('date')->limit(2);
        } ])->findOrFail($id);
        return response()->json($portfolio);
    }
    public function checkNationalID($id){
       $exist = Portfolio::where('national_code',$id)->exists();
        return response()->json($exist);
    }
    public function fetchPortfolioChart(Request $request, $id)
    {
        $timeframe = $request->query('range', '1M'); // 1M | 3M | 6M | 1Y

        $portfolio = Portfolio::findOrFail($id);

        // تعیین بازه زمانی
        $startDate = match ($timeframe) {
            '1M'    => 30,
            '3M'    => 90,
            '6M'    => 180,
            '1Y'    => 365,
            default => 30,
        };

        // گرفتن دیتای نمودار از دیتابیس
        $values = $portfolio->valueHistories()
            ->orderBy('date')
            ->get(['value', 'return', 'date']);
        

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
                'date'   => $item->date,
                'value'  => (int) $item->value,
                'return' => (float) $item->return,
            ];
        });

        return response()->json([
            'portfolio_id' => $portfolio->id,
            'timeframe'    => $timeframe,
            'data'         => $chartData->values(),
        ]);
    }

    // POST /api/portfolios
    public function store(Request $request)
    {
        $payload = $this->validatePayload($request);

        return DB::transaction(function () use ($payload) {
            $portfolio = Portfolio::create([
                'name'            => $payload['name'],
                'national_code'   => $payload['national_code'],
                'phone'           => $payload['phone'] ?? null,
                'address'         => $payload['address'] ?? null,
                'broker_link'     => $payload['broker_link'] ?? null,
                'broker_username' => $payload['broker_username'] ?? null,
                'broker_password' => $payload['broker_password'] ?? null,
                'is_active'       => $payload['is_active'] ?? true,
            ]);

            // financial
            $financial = PortfoliosFinancial::create([
                'portfolio_id'    => $portfolio->id,
                'initial_capital' => (int) round($payload['initial_capital'] ?? 0),
                'commission_pct'  => $payload['commission_pct'] ?? 0,
                'contract_date'   => $payload['contract_date'] ?? null,
                'guarantee_type'  => $payload['guarantee_type'] ?? 'promissory',
                'dividend'        => (int) round($payload['dividend'] ?? 0),
                'withdrawals'     => (int) round($payload['withdrawals'] ?? 0),
                'due_date'        => $this->calcDueDate($payload['contract_date'] ?? null, $payload['guarantee_type'] ?? 'promissory'),
            ]);

            // holdings
            $this->syncHoldings($portfolio, $payload['holdings'] ?? []);

            // init metrics
            $this->recalculateMetrics($portfolio);

            return response()->json(['message' => 'portfolio created', 'data' => $portfolio], 201);
        });
    }

    // PUT /api/portfolios/{id}
    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);
        $payload   = $this->validatePayload($request);

        return DB::transaction(function () use ($portfolio, $payload) {
            $portfolio->update([
                'name'            => $payload['name'],
                'national_code'   => $payload['national_code'],
                'phone'           => $payload['phone'] ?? null,
                'address'         => $payload['address'] ?? null,
                'broker_link'     => $payload['broker_link'] ?? null,
                'broker_username' => $payload['broker_username'] ?? $portfolio->broker_username,
                'broker_password' => $payload['broker_password'] ?? $portfolio->broker_password,
                'is_active'       => $payload['is_active'] ?? $portfolio->is_active,
            ]);

            // update or create financial
            $financial = $portfolio->financial;
            if (! $financial) {
                $financial = new PortfoliosFinancial(['portfolio_id' => $portfolio->id]);
            }
            $financial->initial_capital = (int) round($payload['initial_capital'] ?? $financial->initial_capital ?? 0);
            $financial->commission_pct  = $payload['commission_pct'] ?? $financial->commission_pct ?? 0;
            $financial->contract_date   = $payload['contract_date'] ?? $financial->contract_date;
            $financial->guarantee_type  = $payload['guarantee_type'] ?? $financial->guarantee_type;
            $financial->dividend        = (int) round($payload['dividend'] ?? $financial->dividend ?? 0);
            $financial->withdrawals     = (int) round($payload['withdrawals'] ?? $financial->withdrawals ?? 0);
            $financial->due_date        = $this->calcDueDate($financial->contract_date, $financial->guarantee_type);
            $financial->save();

            // holdings sync
            $this->syncHoldings($portfolio, $payload['holdings'] ?? []);

            // recalc metrics and store snapshot
            $this->recalculateMetrics($portfolio);

            return response()->json(['message' => 'portfolio updated', 'data' => $portfolio->fresh(['financial', 'metrics', 'holdings.symbol'])]);
        });
    }

    // DELETE /api/portfolios/{id}
    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        if ($portfolio) {

            $portfolio->delete();
            return response()->json(['message' => 'portfolio deleted']);
        }
    }

    public function enable($id)
    {
        $p            = Portfolio::findOrFail($id);
        $p->is_active = true;
        $p->save();
        // optionally recalc metrics
        // $this->recalculateMetrics($p);
        return response()->json(['message' => 'enabled']);
    }

    public function disable($id)
    {
        $p            = Portfolio::findOrFail($id);
        $p->is_active = false;
        $p->save();
        // optionally recalc metrics
        // $this->recalculateMetrics($p);
        return response()->json(['message' => 'disabled']);
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

    protected function calcDueDate($contractDate, $guaranteeType)
    {
        if (! $contractDate) {
            return null;
        }

        if ($guaranteeType === 'quarterly') {
            $dt = Carbon::parse($contractDate)->addMonths(3);
            while( $dt < now())
               $dt = Carbon::parse($dt)->addMonths(3);
            return $dt->toDateString();
        }
        return null;
    }

    protected function syncHoldings(Portfolio $portfolio, array $holdings)
    {
        // holdings: [{symbol, quantity}, ...]
        // replace existing holdings with new set (upsert-like)
        // ensure symbols exist (create if not)
        // $existing = $portfolio->holdings()->pluck('quantity', 'symbol_code')->toArray();
        $portfolio->holdings()->delete();

        // We'll delete holdings not in new list, update existing, and create new ones
        // $newCodes = array_map(function($h){ return strtoupper(trim($h['symbol'])); }, $holdings);
        // $newCodes = array_map(function ($h) {return strtoupper(trim($h['symbol']));}, $holdings);
        // // delete removed
        // $portfolio->holdings()->whereNotIn('symbol_code', $newCodes)->delete();

        foreach ($holdings as $h) {
            $name = strtoupper(trim($h['symbol']));
            $code = Symbol::where("name", $name)->pluck('code')->first();
            $qty  = (int) round($h['quantity'] ?? 0);

            if (! $code) {
                continue;
            }

            // ensure symbol exists in symbols table
            // $symbol = Symbol::firstOrCreate(['code' => $code], ['name' => $code, 'last_price' => 426, 'last_price_pct' => 2.94]);

            // $ph = $portfolio->holdings()->where('symbol_code', $code)->first();
            // if ($ph) {
            //     $ph->quantity = $qty;
            //     $ph->save();
            // } else {
            //     PortfolioHolding::Create([
            //         'portfolio_id' => $portfolio->id,
            //         'symbol_code' => $code,
            //         'quantity' => $qty,
            //     ]);
            //  }
            PortfolioHolding::updateOrCreate(['symbol_code' => $code, 'portfolio_id' => $portfolio->id], [
                'quantity' => $qty,
            ]);
        }
    }

    protected function recalculateMetrics(Portfolio $portfolio)
    {
        // recalc based on current holdings and symbols.last_price
        $portfolio->load('financial', 'holdings.symbol');

        $totalValue = 0;
        foreach ($portfolio->holdings as $h) {
            $price       = $h->symbol->last_price / 10 ?? 0;
            $totalValue += ((int) $h->quantity) * ((int) $price);
        }

        $totalValue += (int) ($portfolio->financial->dividend ?? 0) + (int) ($portfolio->financial->withdrawals ?? 0);
        $initial     = (int) ($portfolio->financial->initial_capital ?? 0);

        $returnAmount  = $totalValue - $initial;
        $returnPercent = $initial > 0 ? ($returnAmount / max(1, $initial)) * 100 : 0;
        $managerShare  = $returnAmount > 0 ? (int) round($returnAmount * ($portfolio->financial->commission_pct / 100 ?? 0)) : null;

        // persist metrics
        $metrics = $portfolio->metrics;
        if (! $metrics) {
            $metrics = new PortfoliosMetric(['portfolio_id' => $portfolio->id]);
        }
        $metrics->portfolio_value = (int) round($totalValue);
        $metrics->return_amount   = (int) round($returnAmount);
        $metrics->return_percent  = round($returnPercent, 3);
        $metrics->manager_share   = (int) round($managerShare);
        $metrics->save();

        // store snapshot for today
        // PortfolioValueHistory::updateOrCreate(
        //     ['portfolio_id' => $portfolio->id, 'date' => now()->toDateString()],
        //     ['value' => (int) round($totalValue)]
        // );
    }
}
