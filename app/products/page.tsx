"use client";
 import { useState, useMemo, useEffect, Suspense } from "react";
 import { useSearchParams } from "next/navigation";
 import { products } from "@/lib/products";
 import { Category } from "@/types";
 import ProductCard from "@/components/products/ProductCard";
 import CategoryFilter from "@/components/products/CategoryFilter";
 import { Search, X } from "lucide-react";
 import { useRouter } from "next/navigation";
 

 function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = (searchParams.get("category") as Category) || "all";
  const urlSearch = searchParams.get("search") || ""; 

  const [selectedCategory, setSelectedCategory] = useState<Category>(urlCategory);
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const [sortBy, setSortBy] = useState("default");

  // This causes sync when url changes
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setLocalSearch(urlSearch);
  }, [urlCategory, urlSearch]);

  // submits search - updates url
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!localSearch.trim()) {
      router.push("/products");
      return;
    }
    router.push(
      `/products?search=${encodeURIComponent(localSearch.trim())}`
    );
  }

  // clear search -removes the url
  function clearSearch(){
    setLocalSearch("");
    router.push("/products");
  }

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (urlSearch.trim()) {
      const q = urlSearch.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategory, urlSearch, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-11">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {urlSearch
          ? `Results for "${urlSearch}"`
          :  selectedCategory !== "all"
          ?  selectedCategory.charAt(0).toUpperCase() + 
             selectedCategory.slice(1)
          : "All Products"}
          </h1>
        <p className="text-gray-500 mt-1">
          {filteredProducts.length} products
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Active Search Banner */}
      {urlSearch && (
        <div className="flex items-center gap-2 mb-4 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 w-fit">
          <Search size={14} className="text-orange-500" />
          <span className="text-sm text-orange-700 font-medium">
            Searching: "{urlSearch}"
          </span>
          <button
          onClick={clearSearch}
          className="text-orange-400 hover:text-orange-600 transition ml-1">
            <X size={14} />
          </button>
          </div>
        )}

      {/* Search + Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form 
         onSubmit={handleSearch} 
        className="flex flex-1 items-center border-2 border-gray-200 rounded-full overflow-hidden focus-within:border-orange-500 transition-colors">
          <input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 px-4 py-2 text-sm outline-none"/>
            {localSearch && ( 
              <button 
                type="button"
                onClick={clearSearch}
                className="px-3 text-gray-400 hover:text-gray-600 transition">
                  <X size={16} />
                </button>
            )}
            <button
             type="submit"
             className="px-3 text-gray-400 border-l border-gray-200 hover:text-orange-500 tranistion py-2">
            <Search size={18} />
          </button>
        </form>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-2 border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-orange-500 transition-colors bg-white">
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory} />

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
          <p className="text-gray-500 mt-2">
            {urlSearch
            ? `No results for "${urlSearch}". Try something else.`
            : "Try a different category."} 
            </p>
            {urlSearch && (
              <button
               onClick={clearSearch}
               className="mt-4 bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition">
                Clear Search
               </button>
            )}
        </div>
      )}
    </div>
  );
}

 //  ✅ Skeleton loading cards shown while page loads
 function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 bg-gray-200 rounded-full w-48 mb-6 animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="h-52 bg-gray-200 animate-pulse" />
            <div className="p-4 flex flex-col gap-2">
              <div className="h-3 bg-gray-200 rounded-full w-16 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-full w-2/3 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded-full w-24 mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


  export default function ProductsPage() {
  return (
    <Suspense
      fallback={<LoadingSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}