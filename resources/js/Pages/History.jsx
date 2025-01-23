import React, { useState } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import TransactionModal from "@/Components/product/TransactionModal";

const History = ({ transaction_history }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const closeModal = () => setSelectedTransaction(null);

    return (
        <CustomerLayout>
            <Head title="Riwayat Transaksi" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h2 className="text-lg leading-6 font-medium text-gray-900">
                                Riwayat Transaksi
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Berikut adalah daftar transaksi Anda.
                            </p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                {transaction_history.map(
                                    (transaction, index) => (
                                        <div
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                            } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                                        >
                                            <dt className="text-sm font-medium text-gray-500">
                                                {transaction.product_name}
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <div className="flex justify-between items-center">
                                                    <span>
                                                        Rp{" "}
                                                        {transaction.price.toLocaleString()}{" "}
                                                        x{transaction.quantity}
                                                    </span>
                                                    <span
                                                        className={
                                                            transaction.status ===
                                                            "dikemas"
                                                                ? "text-blue-600 bg-blue-200 text-xs py-1 px-2 rounded"
                                                                : transaction.status ===
                                                                  "selesai"
                                                                ? "text-green-600 bg-green-200 text-xs py-1 px-2 rounded"
                                                                : "text-gray-600"
                                                        }
                                                    >
                                                        {transaction.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Tanggal:{" "}
                                                    {new Date(
                                                        transaction.shipping_date
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}{" "}
                                                    - Lokasi:{" "}
                                                    {transaction.location}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        setSelectedTransaction(
                                                            transaction
                                                        )
                                                    }
                                                    className="mt-2 text-sm text-orange-500 "
                                                >
                                                    Lihat Detail
                                                </button>
                                            </dd>
                                        </div>
                                    )
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">
                            Invoice Transaksi
                        </h2>
                        <TransactionModal
                            selectedTransaction={selectedTransaction}
                        />
                    </div>
                </div>
            )}
        </CustomerLayout>
    );
};

export default History;
