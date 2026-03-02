 "use client";
 import Link from "next/link";
 import { ShoppingCart, Star } from "lucide-react";
 import { Product } from "@/types";
 import { useCartStore } from "@/store/cartStore";

 // telling TypeScript this component expects a Product object as a prop
 interface ProductCardProps {
  product: Product;
}

 function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

  export default function ProductCard({ product }: ProductCardProps) {
     const addItem = useCartStore((state) => state.addItem);
   return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
      
      {/* Image Area */}
      <Link href={`/products/${product.id}`}>
        <div className="bg-gray-100 h-52 flex items-center justify-center text-6xl group-hover:bg-gray-200 transition-colors cursor-pointer">
          {product.emoji}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        {/* Category tag */}
        <span className="text-xs text-orange-500 font-semibold uppercase tracking-wide">
          {product.category}
        </span>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mt-1 text-sm leading-tight hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={12}
              className={
                star <= Math.round(product.rating)
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Stock warning */}
        {product.stock < 10 && (
          <p className="text-xs text-red-500 mt-1 font-medium">
            Only {product.stock} left!
          </p>
        )}

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-gray-900 text-base">
            {formatPrice(product.price)}
          </span>
          <button
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 active:scale-95 transition-all"
            onClick={() => addItem(product, 1)}>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}