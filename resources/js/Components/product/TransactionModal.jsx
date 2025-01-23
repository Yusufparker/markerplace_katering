
const TransactionModal = ({ selectedTransaction }) => {
    // console.log(selectedTransaction);
    return (
        <div className="p-4 text-xs">
            <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Nama Toko:</span>
                    <span>
                        {selectedTransaction.merchant?.name} (
                        {selectedTransaction.merchant?.email})
                    </span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Waktu Transaksi:</span>
                    <span>
                        {new Date(
                            selectedTransaction.created_at
                        ).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Nama Produk:</span>
                    <span>{selectedTransaction.product_name}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Harga:</span>
                    <span>Rp {selectedTransaction.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Jumlah:</span>
                    <span>{selectedTransaction.quantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total:</span>
                    <span>Rp {selectedTransaction.total.toLocaleString()}</span>
                </div>
            </div>
            <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Tanggal Pengiriman:</span>
                    <span>
                        {new Date(
                            selectedTransaction.shipping_date
                        ).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Lokasi:</span>
                    <span>{selectedTransaction.location}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Status:</span>
                    <span>{selectedTransaction.status}</span>
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Nama Pelanggan:</span>
                    <span>
                        {selectedTransaction.user?.name || "Tidak tersedia"}
                    </span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Email Pelanggan:</span>
                    <span>
                        {selectedTransaction.user?.email || "Tidak tersedia"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
