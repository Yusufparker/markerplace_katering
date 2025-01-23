<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $query = Product::with('user');
        if (request('name')) {
            $query->where('name', 'LIKE', '%' . request('name') . '%');
        }
        if (request('merchant')) {
            $query->whereHas('user', function ($q) {
                $q->where('name', 'LIKE', '%' . request('merchant') . '%');
            });
        }
        if (request('location')) {
            $query->whereHas('user.profile', function ($q) {
                $q->where('location', 'LIKE', '%' . request('location') . '%');
            });
        }

        if (request('price')) {
            $query->where('price', '<=', request('price'));
        }

        $products = $query->get();


        return Inertia::render('Home', [
            'products' => $products,
        ]);
    }

}
