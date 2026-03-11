 "use client";
 import { useState } from "react";
 import AdminGuard from "@/components/admin/AdminGuard";
 import AdminSidebar from "@/components/admin/AdminSidebar";

 const allOrders = [
  { id: "ORD001", customer: "Amaka Johnson", email: "amaka@gmail.com", items: 3, total: 45000, status: "delivered", date: "2026-03-01" },
  { id: "ORD002", customer: "Chidi Okonkwo", email: "chidi@gmail.com", items: 1, total: 65000, status: "processing", date: "2026-03-02" },
  { id: "ORD003", customer: "Ngozi Adeyemi", email: "ngozi@gmail.com", items: 2, total: 21000, status: "shipped", date: "2026-03-02" },
  { id: "ORD004", customer: "Emeka Eze", email: "emeka@gmail.com", items: 4, total: 87500, status: "delivered", date: "2026-03-03" },
  { id: "ORD005", customer: "Fatima Bello", email: "fatima@gmail.com", items: 1, total: 15000, status: "processing", date: "2026-03-03" },
  { id: "ORD006", customer: "Tunde Williams", email: "tunde@gmail.com", items: 2, total: 32000, status: "cancelled", date: "2026-03-03" },
];

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
  const [orders, setOrders] = useState(allOrders);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? orders
    : orders.filter((o) => o.status === filter);

  function updateStatus(id: string, newStatus: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
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

          {/* Orders Table */}
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
                      <td className="py-3 px-4 font-mono text-orange-500 font-medium">
                        {order.id}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">{order.customer}</p>
                        <p className="text-xs text-gray-400">{order.email}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {order.items} item{order.items > 1 ? "s" : ""}
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-800">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{order.date}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
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

        </main>
      </div>
    </AdminGuard>
  );
}