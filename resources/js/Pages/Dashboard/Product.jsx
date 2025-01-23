import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "@/Components/product/ProductForm";
import ProductCard from "@/Components/product/ProductCard";

const Product = ({ products }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Produk" />
            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Produk</h1>
                                <Dialog>
                                    <DialogTrigger>
                                        <button className="px-3 py-1 text-white rounded bg-orange-600 text-sm">
                                            Tambah Produk
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Produk
                                            </DialogTitle>
                                            <DialogDescription>
                                                Isi informasi produk baru di
                                                bawah ini.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <ProductForm />
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Product List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* no products */}
                            {products.length === 0 && (
                                <div className="text-center text-gray-500 mt-6">
                                    Belum ada produk yang tersedia.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Product;
