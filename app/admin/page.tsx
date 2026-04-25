"use client";
import Link from "next/link";
import { products } from "@/lib/products";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCard from "@/components/admin/StatsCard";
import { getAllOrders, getNewsletterSubscribers } from "@/lib/firestore";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Mail
} from "lucide-react";

const Orders = [
  { id: "ORD001", customer: "Amaka Johnson", items: 3, total: 45000, status: "delivered", date: "2026-03-01" },
  { id: "ORD002", customer: "Chidi Okonkwo", items: 1, total: 65000, status: "processing", date: "2026-03-02" },
  { id: "ORD003", customer: "Ngozi Adeyemi", items: 2, total: 21000, status: "shipped", date: "2026-03-02" },
  { id: "ORD004", customer: "Emeka Eze", items: 4, total: 87500, status: "delivered", date: "2026-03-03" },
  { id: "ORD005", customer: "Fatima Bello", items: 1, total: 15000, status: "processing", date: "2026-03-03" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

// Status badge color helper
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    processing: "bg-yellow-100 text-yellow-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const totalRevenue = Orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = Orders.length;
  const totalProducts = products.length;
  const processingOrders = Orders.filter((o) => o.status === "processing").length;

  return (
    <AdminGuard>
      <div className="flex">
        <AdminSidebar />

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Here's what's happening on Buyo.ng
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Revenue"
              value={formatPrice(totalRevenue)}
              subtitle="From all orders"
              icon={TrendingUp}
              color="orange"
            />
            <StatsCard
              title="Total Orders"
              value={totalOrders}
              subtitle={`${processingOrders} pending`}
              icon={ShoppingBag}
              color="blue"
            />
            <StatsCard
              title="Products"
              value={totalProducts}
              subtitle="In your catalog"
              icon={Package}
              color="green"
            />
            <StatsCard
              title="Customers"
              value="24"
              subtitle="Registered users"
              icon={Users}
              color="purple"
            />
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-orange-500 text-sm font-medium hover:underline">
                View all →
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-gray-500 font-semibold">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-semibold">
                      Customer
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-semibold">
                      Items
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-semibold">
                      Total
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-semibold">
                      Status
                    </th>
                    <th className="text-left py-3 px-2 text-gray-500 font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 font-mono text-orange-500 font-medium">
                        {order.id}
                      </td>
                      <td className="py-3 px-2 font-medium text-gray-800">
                        {order.customer}
                      </td>
                      <td className="py-3 px-2 text-gray-500">
                        {order.items} item{order.items > 1 ? "s" : ""}
                      </td>
                      <td className="py-3 px-2 font-bold text-gray-800">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3 px-2">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 px-2 text-gray-400">
                        {order.date}
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