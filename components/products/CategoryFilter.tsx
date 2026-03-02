"use client";
import { Category } from "@/types";

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const categories: { label: string; value: Category }[] = [
  { label: "All Products", value: "all" },
  { label: "Clothing", value: "clothing" },
  { label: "Appliances", value: "appliances" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Cosmetics", value: "cosmetics" },
];

 export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === cat.value
              ? "bg-orange-500 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-500"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}