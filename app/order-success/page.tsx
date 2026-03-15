"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-gray-800">Order Placed!</h1>
      <p className="text-gray-500 mt-3 max-w-md">
        Thank you for shopping on Buyo.ng! Your order has been received and
        will be delivered soon.
      </p>

      {/* Show OrderId */}
      {orderId && (
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-2xl px-6 py-4">
          <p className="text-sm text-gray-500">Your Order ID</p>
          <p className="font-mono font-bold text-orange-500 text-lg mt-1">
            {orderId.slice(0, 8).toUpperCase()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Save this for tracking your order
          </p>
        </div>
      )}
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <Link
          href="/account"
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          View My Orders
        </Link>
        <Link
          href="/products"
          className="border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-orange-500 hover:text-orange-500 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

 export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" /> }>
      <OrderSuccessContent />
    </Suspense>
  );
}