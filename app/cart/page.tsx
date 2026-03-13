 "use client";
 import { useCartStore } from "@/store/cartStore";
 import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
 import Link from "next/link";
 import ProductImage from "@/components/ui/ProductImage";
 import toast from "react-hot-toast";

 function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

 export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={80} className="text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-400 mt-2">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/products"
          className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-11">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <button
          onClick={() => {clearCart()
            toast.success("Cart cleared")
          }}
          className="text-sm text-red-400 hover:text-red-600 transition font-medium">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT — Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center">
              {/* Product Image */}
              <div className="bg-gray-100 rounded-xl w-20 h-20 overflow-hidden relative shrink-0">
                <ProductImage
                src={product.image}
                alt={product.name}
                emoji={product.emoji}
                fill={true}
                className="h-full w-full" />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-orange-500 font-semibold uppercase">
                  {product.category}
                </p>
                <h3 className="font-semibold text-gray-800 text-sm leading-tight mt-0.5 truncate">
                  {product.name}
                </h3>
                <p className="text-orange-500 font-bold mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition">
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-semibold text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition">
                  <Plus size={14} />
                </button>
              </div>

              {/* Item Total + Delete */}
              <div className="text-right shrink-0">
                <p className="font-bold text-gray-900 text-sm">
                  {formatPrice(product.price * quantity)}
                </p>
                <button
                  onClick={() => { removeItem(product.id)
                    toast.success("Item removed")
                  }}
                  className="text-red-400 hover:text-red-600 transition mt-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            {/* Items breakdown */}
            <div className="flex flex-col gap-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-gray-500 truncate mr-2">
                    {product.name} x{quantity}
                  </span>
                  <span className="text-gray-800 font-medium shrink-0">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Delivery</span>
                <span className="text-green-500 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-3">
                <span>Total</span>
                <span className="text-orange-500">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="block w-full bg-orange-500 text-white text-center py-3 rounded-full font-semibold hover:bg-orange-600 transition mt-2" >
              Proceed to Checkout
            </Link>

            {/* Continue shopping */}
            <Link
              href="/products"
              className="block w-full text-center text-gray-500 text-sm mt-3 hover:text-orange-500 transition">
              ← Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}