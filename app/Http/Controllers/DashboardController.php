<?php

namespace App\Http\Controllers;
//import inertia

use App\Models\Product;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function  index(){
        $transaction_history = Product::with('transactions')->where('user_id', Auth::user()->id)->get();
        return Inertia::render('Dashboard',[
            'transaction_history' => $transaction_history
        ]);
    }
}
