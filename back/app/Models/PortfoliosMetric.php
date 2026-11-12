<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfoliosMetric extends Model
{
    // protected $table = 'portfolios_metrics';

    protected $fillable = [
        'portfolio_id',
        'portfolio_value',
        'return_amount',
        'return_percent',
        'manager_share',
    ];

    protected $casts = [
        'portfolio_value' => 'integer',
        'return_amount' => 'integer',
        'return_percent' => 'decimal:2',
        'manager_share' => 'integer',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
