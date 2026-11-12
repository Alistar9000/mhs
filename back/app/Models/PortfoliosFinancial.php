<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfoliosFinancial extends Model
{
    // protected $table = 'portfolios_financial';

    protected $fillable = [
        'portfolio_id',
        'initial_capital',
        'commission_pct',
        'contract_date',
        'due_date',
        'guarantee_type',
        'dividend',
        'withdrawals',
    ];

    protected $casts = [
        'initial_capital' => 'integer',
        'dividend' => 'integer',
        'withdrawals' => 'integer',
        'commission_pct' => 'decimal:2',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
