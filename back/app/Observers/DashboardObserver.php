<?php

namespace App\Observers;
use Illuminate\Support\Facades\Cache;

class DashboardObserver
{
    //
    public function saved($model)
    {
        Cache::forget('dashboard');
    }

    public function deleted($model)
    {
        Cache::forget('dashboard');
    }
}
