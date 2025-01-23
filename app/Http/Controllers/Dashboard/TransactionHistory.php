<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionHistory extends Controller
{
    public function index()
    {
        $product_transactions = ProductTransaction::with(['user', 'merchant'])->where('merchant_id', Auth::user()->id)->get();
        return Inertia::render('Dashboard/Transaction',[
            'product_transactions' => $product_transactions
        ]);
    }
}
