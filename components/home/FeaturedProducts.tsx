import Link from "next/link";
import ProductImage from "@/components/ui/ProductImage";
import AddToCartButton from "@/components/home/AddToCartButton";
import { Product } from "@/types"; 

const products: Product[] = [
  {
    id: "1",
    name: "Floral Summer Dress",
    price: 12500,
    category: "clothing", // Must be lowercase to match your Type
    image: "/products/dress2.jpg",
    emoji: "👗",
    rating: 4.5,
    reviews: 24,
    description: "A breezy floral dress perfect for sunny days.",
    stock: 15,
  },
  {
    id: "2",
    name: "Standing Blender",
    price: 35000,
    category: "appliances",
    image: "/products/blend1.jpg",
    emoji: "🥤",
    rating: 4.8,
    reviews: 56,
    description: "High-speed blender for smooth smoothies.",
    stock: 8,
  },
  {
    id: "3",
    name: "Non-stick Frying Pan",
    price: 8500,
    category: "kitchen",
    image: "/products/pan2.jpg",
    emoji: "🍳",
    rating: 4.3,
    reviews: 18,
    description: "Durable non-stick surface for easy cooking.",
    stock: 20,
  },
  {
    id: "4",
    name: "Glow Serum Set",
    price: 15000,
    category: "cosmetics",
    image: "/products/glow2.jpg",
    emoji: "✨",
    rating: 4.9,
    reviews: 102,
    description: "Hydrating serum for a natural radiant glow.",
    stock: 50,
  },
  {
    id: "5",
    name: "Men's Casual Polo",
    price: 7500,
    category: "clothing",
    image: "/products/men2.jpg",
    emoji: "👕",
    rating: 4.2,
    reviews: 31,
    description: "Comfortable cotton polo for everyday wear.",
    stock: 25,
  },
  {
    id: "6",
    name: "Air Fryer 5L",
    price: 65000,
    category: "appliances",
    image: "/products/air1.jpg",
    emoji: "🍟",
    rating: 4.7,
    reviews: 89,
    description: "Large capacity air fryer for healthy meals.",
    stock: 5,
  },
  {
    id: "7",
    name: "Matte Red Lipstick",
    price: 6500,
    category: "cosmetics",
    image: "/products/lip2.jpg",
    emoji: "💄",
    rating: 4.8,
    reviews: 78, 
    description: "Long-lasting matte finish in classic red.",
    stock: 40,
  },
  {
    id: "8",
    name: "Knife Set (6 piece)",
    price: 18000,
    category: "kitchen",
    image: "/products/kk2.jpg",
    emoji: "🔪",
    rating: 4.6,
    reviews: 37,
    description: "Professional grade stainless steel knives.",
    stock: 12,
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "text-orange-400" : "text-gray-300"}
        >
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-1">Handpicked just for you</p>
          </div>
          <Link
            href="/products"
            className="text-orange-500 font-semibold hover:underline text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
            >
              <div className="bg-gray-100 h-48 overflow-hidden relative group-hover:bg-gray-200 transition-colors">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  emoji={product.emoji}
                  fill={true}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4">
                {/* Capitalize the display text using CSS, keep data lowercase */}
                <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="font-semibold text-gray-800 mt-1 text-sm leading-tight h-10 line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-2">
                  <StarRating rating={product.rating} />
                  <p className="text-xs text-gray-400 mt-0.5">
                    {product.reviews} reviews
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}