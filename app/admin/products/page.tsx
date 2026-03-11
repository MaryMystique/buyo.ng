"use client";
import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { products as initialProducts } from "@/lib/products";
import { Product } from "@/types";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <AdminGuard>
      <div className="flex">
        <AdminSidebar />

        <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Products</h1>
              <p className="text-gray-500 mt-1">
                {productList.length} products in your catalog
              </p>
            </div>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full font-semibold hover:bg-orange-600 transition text-sm">
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex items-center gap-3 border-2 border-transparent focus-within:border-orange-500 transition-colors">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-4 px-4 text-gray-500 font-semibold">
                      Product
                    </th>
                    <th className="text-left py-4 px-4 text-gray-500 font-semibold">
                      Category
                    </th>
                    <th className="text-left py-4 px-4 text-gray-500 font-semibold">
                      Price
                    </th>
                    <th className="text-left py-4 px-4 text-gray-500 font-semibold">
                      Stock
                    </th>
                    <th className="text-left py-4 px-4 text-gray-500 font-semibold">
                      Rating
                    </th>
                    <th className="text-left py-4 px-4 text-gray-500 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      {/* Product name + image */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
                            <ProductImage
                              src={product.image}
                              alt={product.name}
                              emoji={product.emoji}
                              fill={true}
                              className="h-full w-full"
                            />
                          </div>
                          <span className="font-medium text-gray-800 line-clamp-2 max-w-45">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-800">
                        {formatPrice(product.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${
                          product.stock < 10 ? "text-red-500" : "text-green-500"
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        ⭐ {product.rating}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}