 "use client";
 import Link from "next/link";
 import { usePathname } from "next/navigation";
 import { useRouter } from "next/navigation";
 import { signOut } from "firebase/auth";
 import { auth } from "@/lib/firebase";
 import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  Store,
} from "lucide-react";

 const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
];

 export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-orange-500">
          Buyo
          <span className="text-white">.ng</span>
        </h1>
        <p className="text-gray-400 text-xs mt-1">Admin Dashboard</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          // Check if this nav item is the current page
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-700 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all text-sm font-medium">
          <Store size={18} />
          View Store
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium w-full">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}