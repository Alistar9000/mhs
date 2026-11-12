<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('update:symbols')->days([0,1,2,3,6])->dailyAt('18:10')->timezone('Asia/Tehran')->withoutOverlapping()->runInBackground();
Schedule::command('update:metrics')->days([0,1,2,3,6])->dailyAt('18:20')->timezone('Asia/Tehran')->withoutOverlapping()->runInBackground();

