import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const TransactionForm = ({ product }) => {
    const [formData, setFormData] = useState({
        quantity: 1,
        shipping_date: "",
        location: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckout = async () => {
        try {
            const response = axios.post("/product/checkout", {
                product_id: product.id,
                quantity: formData.quantity,
                shipping_date: formData.shipping_date,
                location: formData.location,
            });
            toast.success("Pesanan berhasil dibuat.");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("Gagal membuat pesanan.");
        }
    }

    const validateForm = () => {
        const newErrors = {};
        const today = new Date().toISOString().split("T")[0];
        if (formData.quantity < 1) {
            newErrors.quantity = "Jumlah porsi harus lebih dari 0.";
        }

        if (!formData.shipping_date) {
            newErrors.shipping_date = "Tanggal pengiriman harus diisi.";
        } else if (formData.shipping_date < today) {
            newErrors.shipping_date =
                "Tanggal pengiriman tidak boleh di masa lalu.";
        }
        if (!formData.location.trim()) {
            newErrors.location = "Lokasi pengiriman harus diisi.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await handleCheckout();
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="productName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Produk
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={product.name}
                        disabled
                        className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Produk
                    </label>
                    <input
                        type="text"
                        id="price"
                        value={product.price}
                        disabled
                        className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Jumlah Porsi
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={`mt-1 w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                            errors.quantity ? "border-red-500" : ""
                        }`}
                    />
                    {errors.quantity && (
                        <p className="text-sm text-red-500">
                            {errors.quantity}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="shipping_date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tanggal Pengiriman
                    </label>
                    <input
                        type="date"
                        id="shipping_date"
                        name="shipping_date"
                        value={formData.shipping_date}
                        onChange={handleChange}
                        className={`mt-1 w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                            errors.shipping_date ? "border-red-500" : ""
                        }`}
                    />
                    {errors.shipping_date && (
                        <p className="text-sm text-red-500">
                            {errors.shipping_date}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Lokasi Pengiriman
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`mt-1 w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                            errors.location ? "border-red-500" : ""
                        }`}
                    />
                    {errors.location && (
                        <p className="text-sm text-red-500">
                            {errors.location}
                        </p>
                    )}
                </div>
                <div>
                    Total : Rp{(product.price * formData.quantity).toLocaleString("id-ID")}
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
                >
                    Pesan Sekarang
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
