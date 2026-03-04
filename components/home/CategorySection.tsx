import Link from "next/link";
import Image from "next/image";
import ProductImage from "@/components/ui/ProductImage";

const categories = [
  {
    name: "Clothing",
    href: "/products?category=clothing",
    image: "/products/clo.jpg",
    emoji: "👗",
    text: "text-pink-600",
    bg: "bg-pink-50",
    description: "Trendy styles for everyone",
  },
  {
    name: "Appliances",
    href: "/products?category=appliances",
    image: "/products/app.jpg",
    emoji: "🔌",
    text: "text-blue-600",
    bg: "bg-blue-50",
    description: "Power your home",
  },
  {
    name: "Kitchen",
    href: "/products?category=kitchen",
    image: "/products/kit.jpg",
    emoji: "🍳",
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    description: "Cook with the best tools",
  },
  {
    name: "Cosmetics",
    href: "/products?category=cosmetics",
    image: "/products/cos2.jpg",
    emoji: "💄",
    text: "text-purple-600",
    bg: "bg-purple-50",
    description: "Look & feel amazing",
  },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Shop by Category
        </h2>
        <p className="text-gray-500 mt-2">Find exactly what you're looking for</p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className={`${cat.bg} rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 shadow-sm`}>
              {/* category Image */}
              <div className="w-full h-56 overflow-hidden relative">
              <ProductImage
              src={cat.image}
              alt={cat.name}
              emoji={cat.emoji}
              fill={true}
              className="h-full w-full" />
             </div>
             {/* category Info */}
            <div className="p-4 text-center">
            <h3 className={`font-bold text-lg ${cat.text}`}>{cat.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}