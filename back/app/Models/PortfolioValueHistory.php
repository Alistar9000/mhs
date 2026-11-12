<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioValueHistory extends Model
{
    protected $fillable = [
        'portfolio_id',
        'date',
        'value',
        'return',
    ];

    protected $casts = [
        'value' => 'integer',
        'return' => 'decimal:2',
        'date' => 'date',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}

