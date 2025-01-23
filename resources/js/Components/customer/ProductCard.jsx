import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import TransactionForm from './TransactionForm';


const ProductCard = ({product}) => {
    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <div className="h-40 overflow-hidden relative">
                <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition"
                />
                <span className="absolute bottom-3 right-3 text-blue-500 bg-white py-1 px-2 rounded-full font-bold text-[10px]">
                    Rp {product.price.toLocaleString("id-ID")}
                </span>
            </div>
            <div className="p-4">
                <div className="p-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {product.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {product.description}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                        Published by : {product.user.name}
                    </p>    
                    <Dialog>
                        <DialogTrigger>
                            <button className="bg-orange-500 text-white px-3 py-1 mt-5 rounded text-xs hover:bg-orange-600">
                                Pesan Sekarang
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Pesan katering</DialogTitle>
                            </DialogHeader>
                            <TransactionForm product={product} />

                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default ProductCard
