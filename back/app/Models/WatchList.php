<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WatchList extends Model
{
   
    protected $fillable = [
        'symbol_code',
        'type',
        'target1',
        'target2',        
    ]; 
    
     public function symbol()
    {
        return $this->belongsTo(Symbol::class, 'symbol_code', 'code');
    }
}