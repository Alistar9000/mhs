<?php
namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\PortfolioHolding;
use App\Models\Symbol;
use Illuminate\Http\Request;

class SymbolController extends Controller
{
    // GET /api/symbols
    public function index()
    {
         $active = fn($q) => $q->active();
         $topSymbols = Symbol::whereHas('holdings' , function($q) use ($active) { $q->whereHas('portfolio',$active);})
        ->withSum('holdings as total_quantity', 'quantity')
        ->get()
        ->map(fn($s) => [
            'code' => $s->code,
            'name' => $s->name,
            'quantity' => $s->total_quantity,
            'value'  => round($s->total_quantity * ($s->last_price / 10)),
            'last_price_pct' => $s->last_price_pct,
        ])->sortBy('value')->values();
        
        return response()->json($topSymbols);

    }

    // GET /api/symbols/{code}
   public function getPortfolios($code)
{
    $holdings = PortfolioHolding::where('symbol_code', $code)
        ->join('portfolios','portfolio_holdings.portfolio_id','=','portfolios.id')
        ->orderByDesc('portfolio_holdings.quantity')
        ->get(['portfolios.name','portfolio_holdings.quantity']);

    return response()->json($holdings);
}


    // optional: exists endpoint for quick validation GET /api/symbols/exists?code=XXX
    public function exists(Request $request)
    {
        $code   = strtoupper($request->query('code', ''));
        $exists = Symbol::where('code', $code)->exists();
        return response()->json(['exists' => $exists]);
    }
}
