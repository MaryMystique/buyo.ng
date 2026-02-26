import Link from "next/link";

const categories = [
  {
    name: "Clothing",
    href: "/products?category=clothing",
    emoji: "👗",
    bg: "bg-pink-100",
    text: "text-pink-600",
    description: "Trendy styles for everyone",
  },
  {
    name: "Appliances",
    href: "/products?category=appliances",
    emoji: "🔌",
    bg: "bg-blue-100",
    text: "text-blue-600",
    description: "Power your home",
  },
  {
    name: "Kitchen",
    href: "/products?category=kitchen",
    emoji: "🍳",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    description: "Cook with the best tools",
  },
  {
    name: "Cosmetics",
    href: "/products?category=cosmetics",
    emoji: "💄",
    bg: "bg-purple-100",
    text: "text-purple-600",
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
            className={`${cat.bg} rounded-2xl p-6 flex flex-col items-center text-center hover:scale-90 transition-transform duration-200 shadow-sm`}>
            <span className="text-5xl mb-3">{cat.emoji}</span>
            <h3 className={`font-bold text-lg ${cat.text}`}>{cat.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}