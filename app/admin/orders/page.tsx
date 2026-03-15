 "use client";
 import { useState, useEffect } from "react";
 import AdminGuard from "@/components/admin/AdminGuard";
 import AdminSidebar from "@/components/admin/AdminSidebar";
 import { getAllOrders, updateOrderStatus } from "@/lib/firestore";
 import { Order } from "@/types";
 import toast from "react-hot-toast";

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
 const [ordersLoading, setOrdersLoading] = useState(true);
 const [filter, setFilter] = useState("all");

 useEffect(() => {
  async function fetchOrders() {
    const data = await getAllOrders();
    setOrders(data);
    setOrdersLoading(false);
  }
  fetchOrders();
 }, []);

  const filtered = filter === "all"
    ? orders
    : orders.filter((o) => o.status === filter);

  async function handleStatusUpdate(id: string, newStatus: string) {
    await updateOrderStatus(id, newStatus as Order["status"]);
    setOrders((prev) =>
      prev.map((o) => o.id === id ? { ...o, status: newStatus as Order["status"] } : o));
    toast.success("order status updated!");
  }

  return (
    <AdminGuard>
      <div className="flex">
        <AdminSidebar />

        <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            <p className="text-gray-500 mt-1">
              Manage and update customer orders
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", "processing", "shipped", "delivered", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  filter === s
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-400"
                }`} >
                {s}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {ordersLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
              <p className="text-5xl mb-4">📦</p>
              <h3 className="text-xl font-semibold text-gray-700">
                No orders yet
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Orders will appear here once customers start purchasing.
              </p>
            </div>
          ) : (
          // Order Table
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Order ID", "Customer", "Items", "Total", "Status", "Date", "Actions"].map((h) => (
                      <th key={h} className="text-left py-4 px-4 text-gray-500 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      {/* Order ID */}
                      <td className="py-3 px-4 font-mono text-orange-500 font-medium">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      {/* Customer */}
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">{order.userName}</p>
                        <p className="text-xs text-gray-400">{order.userEmail}</p>
                      </td>
                      {/* Items */}
                      <td className="py-3 px-4 text-gray-500">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </td>
                      {/* Total */}
                      <td className="py-3 px-4 font-bold text-gray-800">
                        {formatPrice(order.total)}
                      </td>
                      {/* Status badge */}
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      {/* Date */}
                      <td className="py-3 px-4 text-gray-400 text-xs">{order.createdAt
                        ? new Date(
                          (order.createdAt as any).seconds * 1000
                        ).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        : "just now"}
                        </td>
                        {/* Status Update */}
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-orange-500 transition bg-white"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}