import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="bg-linear-to-r from-orange-500 to-orange-400 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* LEFT - Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Shop Everything <br />
            <span className="text-black">You Love</span>
          </h1>
          <p className="text-lg mb-6 text-orange-100">
            Clothing, Appliances, Kitchen & Cosmetics — all in one place. 
            Fast delivery across Nigeria.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              href="/products"
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/products?category=clothing"
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        {/* RIGHT - Illustration placeholder */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 h-72 bg-orange-300 rounded-full flex items-center justify-center text-6xl shadow-lg">
            🛍️
          </div>
        </div>

      </div>
    </section>
  );
}