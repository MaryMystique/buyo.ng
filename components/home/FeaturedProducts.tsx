 import Link from "next/link";
 import { ShoppingCart } from "lucide-react";

 // Dummy products - we'll replace with real Firebase data later
  const products = [
  {
    id: "1",
    name: "Floral Summer Dress",
    price: 12500,
    category: "Clothing",
    emoji: "👗",
    rating: 4.5,
    reviews: 24,
  },
  {
    id: "2",
    name: "Standing Blender",
    price: 35000,
    category: "Appliances",
    emoji: "🥤",
    rating: 4.8,
    reviews: 56,
  },
  {
    id: "3",
    name: "Non-stick Frying Pan",
    price: 8500,
    category: "Kitchen",
    emoji: "🍳",
    rating: 4.3,
    reviews: 18,
  },
  {
    id: "4",
    name: "Glow Serum Set",
    price: 15000,
    category: "Cosmetics",
    emoji: "✨",
    rating: 4.9,
    reviews: 102,
  },
  {
    id: "5",
    name: "Men's Casual Polo",
    price: 7500,
    category: "Clothing",
    emoji: "👕",
    rating: 4.2,
    reviews: 31,
  },
  {
    id: "6",
    name: "Air Fryer 5L",
    price: 65000,
    category: "Appliances",
    emoji: "🍟",
    rating: 4.7,
    reviews: 89,
  },
 ];

   // Helper to format price in Naira
  function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
 }

  // Star rating display
  function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "text-orange-400" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
 }

    export default function FeaturedProducts() {
     return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-1">Handpicked just for you</p>
          </div>
          <Link
            href="/products"
            className="text-orange-500 font-semibold hover:underline text-sm">
            View All →
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
              {/* Product Image Placeholder */}
              <div className="bg-gray-100 h-48 flex items-center justify-center text-6xl group-hover:bg-gray-200 transition-colors">
                {product.emoji}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="font-semibold text-gray-800 mt-1 text-sm leading-tight">
                  {product.name}
                </h3>
                <StarRating rating={product.rating} />
                <p className="text-xs text-gray-400 mt-0.5">
                  {product.reviews} reviews
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}