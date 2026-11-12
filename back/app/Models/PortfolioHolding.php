<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioHolding extends Model
{
    protected $fillable = [
        'portfolio_id',
        'symbol_code',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }

    public function symbol()
    {
        return $this->belongsTo(Symbol::class, 'symbol_code', 'code');
    }
}

