"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 active:scale-95 transition-all"
      onClick={() => {
        addItem(product, 1);
        toast.success(`${product.name} added to cart!`);
      }}
    >
      <ShoppingCart size={16} />
    </button>
  );
}