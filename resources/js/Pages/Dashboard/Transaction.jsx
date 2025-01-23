import TransactionModal from "@/Components/product/TransactionModal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Transaction = ({ product_transactions }) => {
    const [transactions, setTransactions] = useState(product_transactions);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = (id, newStatus) => {
        const updatedTransactions = transactions.map((transaction) =>
            transaction.id === id
                ? { ...transaction, status: newStatus }
                : transaction
        );
        setTransactions(updatedTransactions);
    };

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Transaksi" />
            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">
                                Daftar Transaksi
                            </h1>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 border text-left">
                                                #
                                            </th>
                                            <th className="px-4 py-2 border text-left">
                                                Nama Produk
                                            </th>
                                            <th className="px-4 py-2 border text-right">
                                                Harga
                                            </th>
                                            <th className="px-4 py-2 border text-center">
                                                Jumlah
                                            </th>
                                            <th className="px-4 py-2 border text-right">
                                                Total
                                            </th>
                                            <th className="px-4 py-2 border text-center">
                                                Tanggal Pengiriman
                                            </th>
                                            <th className="px-4 py-2 border text-left">
                                                Lokasi
                                            </th>
                                            <th className="px-4 py-2 border text-center">
                                                Status
                                            </th>
                                            <th className="px-4 py-2 border text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map(
                                            (transaction, index) => (
                                                <tr
                                                    key={transaction.id}
                                                    className="odd:bg-white even:bg-gray-50"
                                                >
                                                    <td className="px-4 py-2 border text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        {
                                                            transaction.product_name
                                                        }
                                                    </td>
                                                    <td className="px-4 py-2 border text-right">
                                                        Rp{" "}
                                                        {transaction.price.toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center">
                                                        {transaction.quantity}
                                                    </td>
                                                    <td className="px-4 py-2 border text-right">
                                                        Rp{" "}
                                                        {transaction.total.toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center">
                                                        {
                                                            transaction.shipping_date
                                                        }
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        {transaction.location}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center">
                                                        <span 
                                                            className={
                                                                transaction.status === 'dikemas' ? 'text-blue-600 bg-blue-200 text-xs py-1 px-2 rounded' : 
                                                                transaction.status === 'selesai' ? 'text-green-600 bg-green-200 text-xs py-1 px-2 rounded' :
                                                                'text-gray-600'
                                                            }
                                                        >
                                                            {transaction.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 border text-center">
                                                        <button
                                                            onClick={() =>
                                                                openModal(
                                                                    transaction
                                                                )
                                                            }
                                                            className="bg-orange-500 text-white px-3 py-1 rounded text-xs hover:bg-orange-600"
                                                        >
                                                            Invoice
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedTransaction && (
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
                        <TransactionModal selectedTransaction={selectedTransaction} />
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Transaction;
