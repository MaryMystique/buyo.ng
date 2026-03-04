import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-gray-800">Order Placed!</h1>
      <p className="text-gray-500 mt-3 max-w-md">
        Thank you for shopping on Buyo.ng! Your order has been received and
        will be delivered soon.
      </p>
      <div className="flex gap-4 mt-8">
        <Link
          href="/products"
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-orange-500 hover:text-orange-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}