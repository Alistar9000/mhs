<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Symbol extends Model
{
   
    protected $fillable = [
        'code',
        'name',
        'last_price',
        'last_price_pct'
    ];

    protected $casts = [
        'last_price' => 'integer',
        'last_price_pct' => 'decimal:2',
    ];

    public function holdings()
    {
        return $this->hasMany(PortfolioHolding::class, 'symbol_code', 'code');
    }

    public function watchlist()
    {
        return $this->hasMany(WatchList::class, 'symbol_code', 'code');
    }
}
