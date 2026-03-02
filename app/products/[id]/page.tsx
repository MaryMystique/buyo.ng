"use client";
 import { useState } from "react";
 import { useParams, useRouter } from "next/navigation";
 import { products } from "@/lib/products";
 import { ShoppingCart, ArrowLeft, Star, Minus, Plus } from "lucide-react";
 import { useCartStore } from "@/store/cartStore";

 // Price formatter - same one we've been using
 function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

  export default function ProductDetailPage() {
  const { id } = useParams(); // grab the id from the URL
  const router = useRouter(); // lets us navigate programmatically
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  // Find the product whose id matches the URL
  const product = products.find((p) => p.id === id);

  // If no product found, show a not found message
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="text-gray-500 mt-2">
          This product may have been removed or doesn't exist.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Quantity controls — can't go below 1 or above stock
  const decreaseQty = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQty = () =>
    setQuantity((prev) => Math.min(product.stock, prev + 1));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-6">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT — Product Image */}
        <div className="bg-gray-100 rounded-3xl flex items-center justify-center h-80 md:h-112.5 text-9xl shadow-inner">
          {product.emoji}
        </div>

        {/* RIGHT — Product Info */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
            {product.category}
          </span>

          {/* Name */}
          <h1 className="text-3xl font-bold text-gray-800 mt-2 leading-tight">
            {product.name}
          </h1>

          {/* Rating Row */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.rating)
                      ? "fill-orange-400 text-orange-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900 mt-4">
            {formatPrice(product.price)}
          </p>

          {/* Description */}
          <p className="text-gray-500 mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Stock status */}
          <p className={`mt-3 text-sm font-medium ${
            product.stock > 10 ? "text-green-500" : "text-red-500"
          }`}>
            {product.stock > 10
              ? `✅ In Stock (${product.stock} available)`
              : `⚠️ Only ${product.stock} left!`}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={decreaseQty}
                className="px-4 py-2 hover:bg-gray-100 transition text-gray-600">
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 font-semibold text-gray-800 min-w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                className="px-4 py-2 hover:bg-gray-100 transition text-gray-600">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => addItem(product, quantity)}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 active:scale-95 transition-all" >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              onClick={() => console.log("Buy now", product.name)}
              className="flex-1 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 active:scale-95 transition-all">
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* Related Products - same category */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          More from {product.category}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((related) => (
              <button
                key={related.id}
                onClick={() => router.push(`/products/${related.id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-left group">
                <div className="bg-gray-100 h-36 flex items-center justify-center text-5xl group-hover:bg-gray-200 transition-colors">
                  {related.emoji}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {related.name}
                  </p>
                  <p className="text-orange-500 font-bold text-sm mt-1">
                    {formatPrice(related.price)}
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>

    </div>
  );
}