"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; 
import { updateProfile, signOut } from "firebase/auth";
import Link from "next/link";
import {
  User,
  Mail,
  ShoppingBag,
  LogOut,
  Pencil,
  Check,
  X,
  Package,
  ChevronRight,
  Shield,
} from "lucide-react";
import { getUserOrders } from "@/lib/firestore";
import { Order } from "@/types";

const [orders, setOrders] = useState<Order[]>([]);
const [ordersLoading, setOrdersLoading] = useState(true);

useEffect(() => {
  async function fetchOrders() {
    if (!user) return;
    setOrdersLoading(true);
    const userOrders = await getUserOrders(user.uid);
    setOrders(userOrders);
    setOrdersLoading(false);
  }
  fetchOrders();
}, [user]);

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

const statusStyles: Record<string, string> = {
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "settings">("orders");

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  // Set initial name value when user loads
  useEffect(() => {
    if (user?.displayName) {
      setNewName(user.displayName);
    }
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  // Get user initials for avatar
  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0].toUpperCase() || "U";

  // Update display name
  async function handleUpdateName() {
    if (!newName.trim() || !user) return;
    setUpdateLoading(true);
    try {
      await updateProfile(user, { displayName: newName.trim() });
      setUpdateSuccess(true);
      setIsEditingName(false);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating name:", err);
    } finally {
      setUpdateLoading(false);
    }
  }

  // Logout
  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-11">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
        <p className="text-gray-500 mt-1">
          Manage your profile and view your orders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT — Profile Card */}
        <div className="md:col-span-1 flex flex-col gap-4">

          {/* Avatar + Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
            {/* Avatar circle with initials */}
            <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
              {initials}
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              {user.displayName || "Buyo User"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>

            {/* Member since */}
            <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
              <Shield size={12} />
              <span>
                Member since{" "}
                {new Date(
                  user.metadata.creationTime || ""
                ).toLocaleDateString("en-NG", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4 mt-5 pt-5 border-t border-gray-100 w-full justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">
                  {orders.length}
                </p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">
                  {orders.filter((o) => o.status === "delivered").length}
                </p>
                <p className="text-xs text-gray-500">Delivered</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">
                  {orders.filter((o) => o.status === "processing").length}
                </p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} />
                Order History
              </div>
              <ChevronRight size={16} />
            </button>

            <div className="h-px bg-gray-100" />

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <User size={18} />
                Account Settings
              </div>
              <ChevronRight size={16} />
            </button>

            <div className="h-px bg-gray-100" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-red-400 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* RIGHT — Tab Content */}
        <div className="md:col-span-2">

          {/* ORDER HISTORY TAB */}
          {activeTab === "orders" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                  <Package size={48} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500">No orders yet</p>
                  <Link
                    href="/products"
                    className="mt-4 inline-block bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow-sm p-5"
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-mono text-orange-500 font-bold text-sm">
                          {order.id}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.date).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-col gap-2 mb-4">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-300" />
                            <span className="text-gray-700">
                              {item.name}
                              <span className="text-gray-400 ml-1">
                                x{item.qty}
                              </span>
                            </span>
                          </div>
                          <span className="text-gray-600 font-medium">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {order.items.length} item
                        {order.items.length > 1 ? "s" : ""}
                      </span>
                      <span className="font-bold text-gray-800">
                        Total: {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                Account Settings
              </h2>

              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">

                {/* Success message */}
                {updateSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <Check size={16} />
                    Name updated successfully!
                  </div>
                )}

                {/* Display Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Display Name
                  </label>
                  {isEditingName ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 border-2 border-orange-500 rounded-xl px-4 py-2.5 text-sm outline-none"
                        autoFocus
                      />
                      <button
                        onClick={handleUpdateName}
                        disabled={updateLoading}
                        className="bg-orange-500 text-white px-4 py-2.5 rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
                      >
                        {updateLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Check size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingName(false);
                          setNewName(user.displayName || "");
                        }}
                        className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border-2 border-gray-100 rounded-xl px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-800">
                          {user.displayName || "Not set"}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-orange-500 hover:text-orange-600 transition"
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Email - read only */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 border-2 border-gray-100 rounded-xl px-4 py-2.5 bg-gray-50">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {user.email}
                    </span>
                    <span className="ml-auto text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-1">
                    Email cannot be changed here.
                  </p>
                </div>

                {/* Account Created */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center gap-3 border-2 border-gray-100 rounded-xl px-4 py-2.5 bg-gray-50">
                    <Shield size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(
                        user.metadata.creationTime || ""
                      ).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border-t border-gray-100 pt-5 mt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Account Actions
                  </p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-600 transition text-sm font-medium border-2 border-red-100 hover:border-red-300 px-4 py-2.5 rounded-xl"
                  >
                    <LogOut size={16} />
                    Sign Out of Buyo.ng
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}