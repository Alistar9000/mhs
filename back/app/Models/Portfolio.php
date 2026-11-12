<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'national_code',
        'phone',
        'address',
        'broker_link',
        'broker_username',
        'broker_password',
        'is_active',
    ];

    protected $casts = [
        'broker_username' => 'encrypted', // اضافه شد
        'broker_password' => 'encrypted',
        'is_active' => 'boolean',
    ];

    public function financial()
    {
        return $this->hasOne(PortfoliosFinancial::class);
    }

    public function metrics()
    {
        return $this->hasOne(PortfoliosMetric::class);
    }

    public function holdings()
    {
        return $this->hasMany(PortfolioHolding::class);
    }

    public function valueHistories()
    {
        return $this->hasMany(PortfolioValueHistory::class);
    }
    
    public function scopeActive($query){
        return $query->where('is_active',true);
    }
}
