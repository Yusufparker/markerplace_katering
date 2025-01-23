import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import ProductForm from "./ProductForm";

const ProductCard = ({ product }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/dashboard/product/${product.id}`);
            toast.success("Product deleted successfully.");
            window.location.reload();
        } catch (error) {
            toast.error("Failed to delete product.");
        }
    };

    return (
        <div className="overflow-hidden shadow border rounded-xl hover:shadow transition">
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
                <h2 className="text-slate-700 hover:text-slate-900 font-bold w-[80%]">
                    {product.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                    {product.description}
                </p>

                <div className="flex gap-2 mt-4 justify-end">
                    <Dialog>
                        <DialogTrigger>
                            <button className="bg-orange-500 text-white px-3 py-1 rounded text-xs hover:bg-orange-600">
                                Edit
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Produk</DialogTitle>
                            </DialogHeader>
                            <ProductForm product={product} />
                        </DialogContent>
                    </Dialog>

                    <AlertDialog>
                        <AlertDialogTrigger>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                                Delete
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah kamu yakin?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak dapat dibatalkan. Ini
                                    akan menghapus produk secara permanen.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white hover:bg-red-600"
                                >
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
