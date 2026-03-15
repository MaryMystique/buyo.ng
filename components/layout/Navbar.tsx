 "use client";
 import Link from "next/link";
 import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
 import { useCartStore } from "@/store/cartStore";
 import { useAuthStore } from "@/store/authStore";
 import { signOut } from "firebase/auth";
 import { auth } from "@/lib/firebase";
 

 export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user } = useAuthStore();

  const categories = [
    { name: "Clothing", href: "/products?category=clothing" },
    { name: "Appliances", href: "/products?category=appliances" },
    { name: "Kitchen", href: "/products?category=kitchen" },
    { name: "Cosmetics", href: "/products?category=cosmetics" },
  ];

  async function handleLogout() {
    await signOut(auth);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery(""); // clear input after search
    setIsMenuOpen(false); // close mobile menu
  }

  // Handle Enter key press
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSearch(e as any);
    }
  }

  return (
    <nav className="bg-white shadow-md h-20 sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-orange-500 shrink-0">
          Buyo
          <span className="text-black">.ng</span>
        </Link>

        {/* SEARCH BAR - hidden on mobile */}
        <form 
        onSubmit={handleSearch}
        className="hidden md:flex flex-1 items-center border-2 border-orange-500 rounded-full overflow-hidden max-w-xl">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 text-sm outline-none"/>
          <button 
          type="submit"
          className="bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition">
            <Search size={18} />
          </button>
        </form>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* Account */}
          {user ? ( 
            <div className="hidden md:flex items-center gap-3">
              <Link 
               href="/account"
               className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition">
                {/* Avatar circle */}
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.displayName?.[0]?.toUpperCase() ||
                    user.email?.[0]?.toUpperCase() ||
                    "U"}
                </div>
                <span className="font-medium">
                  {user.displayName?.split(" ")[0] || "Account"}
                </span>
               </Link>
              
           <button
           onClick={handleLogout}
           className="text-sm text-red-400 hover:text-red-600 transition font-medium">
            Logout
           </button>
           </div>
          ) : (
          <Link
            href="/auth"
            className="hidden md:flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition">
            <User size={20} />
            <span>Account</span>
          </Link>
          )}

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-orange-500 transition">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
            )}
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
      <div className="hidden md:flex bg-orange-500 h-15">
        <div className="max-w-7xl mx-auto px-4 flex gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="text-white text-1xl font-medium py-2 hover:bg-orange-600 px-3 transition" >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {/* Mobile search */}
          <form
           onSubmit={handleSearch}
          className="flex items-center border-2 border-orange-500 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm outline-none" />
            <button 
             type="submit"
            className="bg-orange-500 px-4 py-2 text-white">
              <Search size={18} />
            </button>
          </form>

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
          {user ? (
            <div className="flex flex-col gap-2 border-t border-gray-100">
          <Link
            href="/account"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition font-medium">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                {user.displayName?.[0]?.toUpperCase() || "U"}
              </div>
              {user.displayName?.split(" ")[0] || "My Account"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-400 font-medium text-left">
                  Logout
              </button>
              </div>
             ) : (
                <Link
                 href="/auth"
                 className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
                 onClick={() => setIsMenuOpen(false)}>
                 <User size={20} />
                 <span>Login / Register</span>
             </Link>
             )}
         </div>
       )}
     </nav>
  );
}