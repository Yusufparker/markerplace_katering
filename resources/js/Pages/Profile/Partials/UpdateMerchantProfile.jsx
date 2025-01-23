import axios from "axios";
import React, { useState } from "react";

export default function UpdateMerchantProfile({profile}) {

    const [formData, setFormData] = useState({
            contact: profile?.profile?.contact || "", 
            image: null, 
            location: profile?.profile?.location || "", 
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        const form = new FormData();
        form.append("contact", formData.contact);
        form.append("location", formData.location);
        if (formData.image) {
            form.append("image", formData.image);
        }

        try {
            const response = await axios.post("/profile/merchant", form);
            setSuccessMessage("Profil berhasil diperbarui!");
            window.location.reload();
        } catch (err) {
            setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Informasi Profil Toko
                </h2>
            </header>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Kontak
                    </label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Masukkan nomor kontak"
                    />
                </div>
                <div>
                    {profile.image && (
                        <img className="w-40ls" src={`/storage/${profile.image}`} alt="" />
                    )}
                </div>

                <div>
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Gambar
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Lokasi
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Masukkan lokasi toko"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {successMessage && (
                    <p className="text-sm text-green-600">{successMessage}</p>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                            isSubmitting
                                ? "bg-gray-400"
                                : "bg-slate-700 hover:bg-slate-800"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {isSubmitting ? "Menyimpan..." : "Simpan Profil"}
                    </button>
                </div>
            </form>
        </section>
    );
}
