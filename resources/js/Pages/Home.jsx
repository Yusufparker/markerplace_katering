import React, { useState } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Header from "@/Components/customer/Header";
import { Head } from "@inertiajs/react";
import ProductCard from "@/Components/customer/ProductCard";
const Home = ({products}) => {
    return (
        <CustomerLayout>
            <Head title="Marketplace Katering" />
            <Header />
            <div>
                <div className="py-5">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <form action="/">
                                    <div className="flex w-full justify-between items-center mb-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full mt-1 rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                                            placeholder="Cari Produk"
                                        />
                                    
                                        <input
                                            type="text"
                                            name="merchant"
                                            className=" mt-1 w-1/2 rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                                            placeholder="Nama Toko"
                                        />
                                    
                                    </div>
                                    <div className="flex w-full justify-between items-center mb-6 gap-4">
                                        <input
                                            type="text"
                                            name="location"
                                            className="w-1/2 mt-1 rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                                            placeholder="Lokasi"
                                        />
                                    
                                        <input
                                            type="number"
                                            name="price"
                                            className=" mt-1 w-1/2 rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                                            placeholder="Maksimal Harga"
                                        />
                                    
                                        <button type="submit" className="bg-orange-500 py-2 px-3 text-white rounded">Cari</button>
                                    </div>

                                </form>
                            </div>
                            <div className="p-6 text-gray-900 bg-red">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
};

export default Home;
