"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Clothing", href: "/products?category=clothing" },
    { name: "Appliances", href: "/products?category=appliances" },
    { name: "Kitchen", href: "/products?category=kitchen" },
    { name: "Cosmetics", href: "/products?category=cosmetics" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-orange-500 shrink-0">
          Buyo<span className="text-black">.ng</span>
        </Link>

        {/* SEARCH BAR - hidden on mobile */}
        <div className="hidden md:flex flex-1 items-center border-2 border-orange-500 rounded-full overflow-hidden max-w-xl">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 text-sm outline-none"/>
          <button className="bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition">
            <Search size={18} />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* Account */}
          <Link
            href="/auth"
            className="hidden md:flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition">
            <User size={20} />
            <span>Account</span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-orange-500 transition">
            <ShoppingCart size={24} />
            {/* Cart count badge */}
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)} >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* CATEGORY NAV - desktop */}
      <div className="hidden md:flex bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 flex gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="text-white text-sm font-medium py-2 hover:bg-orange-600 px-3 transition" >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {/* Mobile search */}
          <div className="flex items-center border-2 border-orange-500 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 text-sm outline-none" />
            <button className="bg-orange-500 px-4 py-2 text-white">
              <Search size={18} />
            </button>
          </div>

          {/* Mobile categories */}
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="text-gray-700 font-medium hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)} >
              {cat.name}
            </Link>
          ))}

          {/* Mobile account */}
          <Link
            href="/auth"
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
            onClick={() => setIsMenuOpen(false)}>
            <User size={20} />
            <span>Account</span>
          </Link>
        </div>
      )}
    </nav>
  );
}