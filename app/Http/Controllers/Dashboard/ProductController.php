<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Product',[
            'products' => Product::where('user_id', Auth::user()->id)->get()
        ]);
    }

    public function store()
    {
        $validated = request()->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|image',
        ]);
        try {
    
            $validated['image'] = request()->file('image')->store('products', 'public');
            $validated['user_id'] = Auth::user()->id;
            if (Auth::user()->role !== 'merchant') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not allowed to create product'
                ]);
            }
            Product::create($validated);
            return response()->json([
                'status' => 'success',
                'message' => 'Product created successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 'error',
                'message' => 'Product creation failed'
            ]);
        }

        
    }

    public function delete($product_id)
    {
        try {
            $product = Product::find($product_id);
            if ($product->user_id !== Auth::user()->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not allowed to delete this product'
                ]);
            }
            //delete image
            $image = $product->image;
            if (file_exists(public_path('storage/'.$image))) {
                unlink(public_path('storage/'.$image));
            }


            $product->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully'
            ]);


        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()  
            ]);
        }
    }

    public function update($product_id){
        $validated = request()->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'image',
        ]);
        try {
            $product = Product::find($product_id);
            if ($product->user_id !== Auth::user()->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not allowed to update this product'
                ]);
            }
            if (request()->hasFile('image')) {
                //delete old image
                $image = $product->image;
                if (file_exists(public_path('storage/'.$image))) {
                    unlink(public_path('storage/'.$image));
                }
                $validated['image'] = request()->file('image')->store('products', 'public');
            }
            $product->update($validated);
            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ]);
        }
    }
}
