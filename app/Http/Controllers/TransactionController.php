<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{

    public function checkout(){
        $validatedData = request()->validate([
            'product_id' => 'required',
            'quantity' => 'required',
            'quantity' => 'required',
            'shipping_date' => 'required',
            'location' => 'required',
        ]);

        try {
            $validatedData['user_id'] = Auth::user()->id;
            $validatedData['product_name'] = Product::find($validatedData['product_id'])->name;
            $validatedData['price'] = Product::find($validatedData['product_id'])->price;
            $validatedData['total'] = $validatedData['price'] * $validatedData['quantity'];
            $validatedData['status'] = 'dikemas';
            $validatedData['merchant_id'] = Product::find($validatedData['product_id'])->user_id;
            ProductTransaction::create($validatedData);
            return response()->json([
                'status' => 'success',
                'message' => 'Transaction success'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }

    }

    public function history(){
        $transaction_history = ProductTransaction::with(['user', 'merchant'])->where('user_id', Auth::user()->id)->get();
        return Inertia::render('History',[
            'transaction_history' => $transaction_history
        ]);
    }
}
