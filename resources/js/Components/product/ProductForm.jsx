import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProductForm = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || "",
        image: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Nama produk wajib diisi.";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Deskripsi produk wajib diisi.";
        }
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            newErrors.price = "Harga harus berupa angka positif.";
        }
        if (!formData.image && !product?.image) {
            newErrors.image = "Gambar produk wajib diunggah.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const createProduct = async (data) => {
        try {
            const response = await axios.post("/dashboard/product", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            toast.success("Produk berhasil disimpan!");
            window.location.reload();
        } catch (error) {
            toast.error("Terjadi kesalahan saat menyimpan produk.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(
                `/dashboard/product/${product.id}/update`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response);
            toast.success("Produk berhasil diperbarui!");
            window.location.reload();
        } catch (error) {
            toast.error("Terjadi kesalahan saat memperbarui produk.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);

            if (formData.image) {
                data.append("image", formData.image);
            }

            setLoading(true);
            if (product) {
                updateProduct(data);
            } else {
                createProduct(data);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Nama
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                    placeholder="Masukkan nama produk"
                />
                {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Deskripsi
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full mt-1 rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                    placeholder="Masukkan deskripsi produk"
                    rows="4"
                ></textarea>
                {errors.description && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.description}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Harga
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full mt-1 rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                    placeholder="Masukkan harga produk"
                />
                {errors.price && (
                    <p className="text-sm text-red-600 mt-1">{errors.price}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Gambar
                </label>
                {product?.image && !formData.image && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="w-32 h-32 object-cover rounded"
                        />
                    </div>
                )}
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full mt-1 block text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                    accept="image/*"
                />
                {errors.image && (
                    <p className="text-sm text-red-600 mt-1">{errors.image}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white bg-orange-600 rounded hover:bg-orange-700 focus:outline-none focus:ring disabled:bg-orange-200 focus:ring-orange-500 focus:ring-opacity-50"
                >
                    {product ? "Perbarui" : "Simpan"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
