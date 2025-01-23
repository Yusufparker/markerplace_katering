<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\TransactionHistory;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CustomerController::class,'index'])->middleware('customer');

Route::post('/product/checkout', [TransactionController::class, 'checkout'])->middleware('customer');
Route::get('/history', [TransactionController::class, 'history'])->middleware('customer')->name('customer_history');

Route::prefix('dashboard')->middleware(['auth', 'merchant'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::prefix('/product')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('dashboard.product');
        Route::post('/', [ProductController::class, 'store'])->name('dashboard.product.store');
        Route::delete('/{product_id}', [ProductController::class, 'delete'])->name('dashboard.product.delete');
        Route::post('/{product_id}/update', [ProductController::class, 'update'])->name('dashboard.product.update');
    });
    Route::prefix('/transaction')->group(function () {
        Route::get('/', [TransactionHistory::class, 'index'])->name('dashboard.transaction');
    });
});


Route::middleware(['auth', 'merchant'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/merchant', [ProfileController::class, 'updateMechantProfile']);
});

require __DIR__.'/auth.php';
