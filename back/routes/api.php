<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\WatchListController;
use App\Http\Controllers\SymbolController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->group(function () {

    Route::get('/', [DashboardController::class, 'index']);
    Route::post('/chart', [DashboardController::class, 'fetchDashboardChart']);
    Route::get('/due_date_list', [DashboardController::class, 'fetchDueDateList']);
    Route::get('/due_date_list/{id}', [DashboardController::class, 'updateDueDateList']);
    Route::put('/profile/{username}', [DashboardController::class, 'updateUserProfile']);
    Route::get('/profile/{username}', [DashboardController::class, 'getUserProfile']);

});

Route::prefix('portfolios')->group(function () {
    Route::post('/', [PortfolioController::class, 'index']);                         // لیست سبدها + فیلتر + سرچ + paginate
    Route::post('/add', [PortfolioController::class, 'store']);                      // ساخت سبد جدید
    Route::post('/{id}', [PortfolioController::class, 'show']);                      // دریافت اطلاعات سبد
    Route::post('/{id}/chart', [PortfolioController::class, 'fetchPortfolioChart']); // دریافت اطلاعات سبد
    Route::put('/{id}', [PortfolioController::class, 'update']);                     // ویرایش سبد
    Route::delete('/{id}', [PortfolioController::class, 'destroy']);                 // حذف سبد
    Route::post('/national_code/{id}', [PortfolioController::class, 'checkNationalID']);
    Route::put('/enable/{id}', [PortfolioController::class, 'enable']);   // فعال کردن سبد
    Route::put('/disable/{id}', [PortfolioController::class, 'disable']); // غیرفعال کردن سبد
});

Route::prefix('symbols')->group(function () {
    Route::get('/', [SymbolController::class, 'index']);                // لیست نمادها
    Route::get('exists', [SymbolController::class, 'exists']);          // نمایش / ولیدیشن نماد
    Route::post('/{code}', [SymbolController::class, 'getPortfolios']); // نمایش / ولیدیشن نماد
});
Route::prefix('watchlist')->group(function () {
    Route::get('/', [WatchListController::class, 'index']);                // لیست نمادها
    Route::post('/', [WatchListController::class, 'create']);          // نمایش / ولیدیشن نماد
    Route::put('/{code}', [WatchListController::class, 'edit']); // نمایش / ولیدیشن نماد
    Route::delete('/{code}', [WatchListController::class, 'delete']); // نمایش / ولیدیشن نماد
});
