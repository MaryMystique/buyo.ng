"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/firestore";
import { useCartStore } from "@/store/cartStore";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function OrderProcessingPage() {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [error, setError] = useState("");
  
  // This ref prevents the effect from running twice in React Strict Mode
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    async function processOrder() {
      try {
        // 1. Retrieve the saved order data
        const pendingOrderJson = localStorage.getItem("Pending_order");

        if (!pendingOrderJson) {
          setError("No pending order found. It may have already been processed.");
          return;
        }

        const orderData = JSON.parse(pendingOrderJson);

        // 2. Save the order to Firestore
        const result = await createOrder(orderData);

        if (result.success) {
          // 3. Clean up localStorage and empty the cart
          localStorage.removeItem("Pending_order");
          clearCart();

          // 4. Send user to the success page with the new orderId
          router.replace(`/order-success?orderId=${result.orderId}`);
        } else {
          setError("Your payment was successful, but we couldn't save your order details. Please contact support.");
        }
      } catch (err) {
        console.error("Error processing order:", err);
        setError("An unexpected error occurred while processing your order.");
      }
    }

    processOrder();
  }, [router, clearCart]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md w-full border border-red-100">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-sm text-red-500 mb-6">{error}</p>
          <Link 
            href="/checkout"
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Return to Checkout
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          <h1 className="text-2xl font-bold text-gray-800">Processing your order...</h1>
          <p className="text-gray-500">Please do not close or refresh this page.</p>
        </div>
      )}
    </div>
  );
}