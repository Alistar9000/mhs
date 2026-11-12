<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Portfolio;
use App\Models\PortfoliosMetric;
use App\Models\PortfoliosFinancial;
use App\Models\PortfolioHolding;
use App\Observers\DashboardObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    Portfolio::observe(DashboardObserver::class);
    PortfoliosMetric::observe(DashboardObserver::class);
    PortfoliosFinancial::observe(DashboardObserver::class);
    PortfolioHolding::observe(DashboardObserver::class);
    }
}
