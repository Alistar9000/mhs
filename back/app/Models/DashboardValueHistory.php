<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DashboardValueHistory extends Model
{
    //
    protected $fillable = [
        'value',
        'return',
    ];

    protected $casts = [
        'return' => 'decimal:2',
        
    ];
}
