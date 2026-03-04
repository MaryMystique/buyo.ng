 "use client";
 import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { useCartStore } from "@/store/cartStore";
 import { useAuthStore } from "@/store/authStore";
 import { usePaystackPayment } from "react-paystack";
 import { ShoppingBag, MapPin, Phone, User, ArrowLeft } from "lucide-react";
 import Link from "next/link";
 import ProductImage from "@/components/ui/ProductImage";

 function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

 export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [form, setForm] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={80} className="text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-400 mt-2">Add items before checking out.</p>
        <Link
          href="/products"
          className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  // Paystack config
  const paystackConfig = {
    reference: `buyo_${Date.now()}`,
    email: form.email,
    amount: getTotalPrice() * 100, // Paystack uses kobo (multiply by 100)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    currency: "NGN",
  };

  // What happens when payment succeeds
  const onPaymentSuccess = (reference: any) => {
    console.log("Payment successful!", reference);
    clearCart();
    router.push("/order-success");
  };

  // What happens when user closes payment modal
  const onPaymentClose = () => {
    console.log("Payment cancelled");
  };

  const InitializePayment = usePaystackPayment(paystackConfig);

  // Handle form input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Validate form before payment
  function handleProceedToPayment() {
    const { fullName, email, phone, address, city, state } = form;
    if (!fullName || !email || !phone || !address || !city || !state) {
      alert("Please fill in all delivery details before proceeding.");
      return;
    }
    if (phone.length < 11) {
      alert("Please enter a valid Nigerian phone number.");
      return;
    }
    // Launch Paystack payment popup
    InitializePayment({
      onSuccess: onPaymentSuccess,
      onClose: onPaymentClose,
    });
  }

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
    "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-orange-500 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT — Delivery Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Delivery Info Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="text-orange-500" size={20} />
              <h2 className="text-lg font-bold text-gray-800">
                Delivery Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Mary Doe"
                    className="w-full border-2 border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"/>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08012345678"
                    className="w-full border-2 border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"/>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"/>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="12 Aba Road, GRA"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"/>
              </div>

              {/* City */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Port Harcourt"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"/>
              </div>

              {/* State */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  State
                </label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors bg-white"
                >
                  <option value="">Select state</option>
                  {nigerianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Payment Method
            </h2>
            <div className="border-2 border-orange-500 rounded-xl p-4 flex items-center gap-3 bg-orange-50">
              <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"/>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  Paystack — Card, Bank Transfer & USSD
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Secured by Paystack. Your payment info is never stored.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-lg w-12 h-12 overflow-hidden relative shrink-0">
                    <ProductImage
                     src={product.image}
                     alt={product.name}
                     emoji={product.emoji}
                     fill={true}
                     className="h-full w-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400">Qty: {quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-800 shrink-0">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery</span>
                <span className="text-green-500 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-orange-500">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleProceedToPayment}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-base hover:bg-orange-600 active:scale-95 transition-all mt-6 disabled:opacity-50"
            >
              Pay {formatPrice(getTotalPrice())}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Secured by Paystack
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}