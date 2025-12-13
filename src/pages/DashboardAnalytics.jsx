import React, { useEffect, useState } from "react";
import { FiTrendingUp, FiPackage, FiShoppingBag, FiDollarSign, FiAlertTriangle } from "react-icons/fi";

export default function DashboardAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const data = getTodayStats();
    setStats(data);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Dashboard Analytics</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today Stock Added */}
        <div className="p-6 bg-white shadow rounded-xl border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <FiPackage className="text-3xl text-blue-500" />
            <div>
              <p className="text-gray-500 text-sm">Today Added Stock</p>
              <h2 className="text-2xl font-bold">{stats.todayStockAdded}</h2>
            </div>
          </div>
        </div>

        {/* Best Selling Today */}
        <div className="p-6 bg-white shadow rounded-xl border-l-4 border-green-500">
          <div className="flex items-center gap-4">
            <FiTrendingUp className="text-3xl text-green-500" />
            <div>
              <p className="text-gray-500 text-sm">Top Selling Product</p>
              <h2 className="text-lg font-bold">{stats.topSellingProduct || "No Sales"}</h2>
            </div>
          </div>
        </div>

        {/* Today Revenue */}
        <div className="p-6 bg-white shadow rounded-xl border-l-4 border-yellow-500">
          <div className="flex items-center gap-4">
            <FiDollarSign className="text-3xl text-yellow-500" />
            <div>
              <p className="text-gray-500 text-sm">Today Total Payment</p>
              <h2 className="text-2xl font-bold">₹{stats.todayRevenue}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* TODAY ORDERS */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4">Today Orders</h2>
        <p className="text-3xl font-semibold">{stats.todayOrders}</p>
      </div>

      {/* LOW STOCK ALERT */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
          <FiAlertTriangle /> Low Stock Alert
        </h2>
        {stats.lowStock.length === 0 ? (
          <p className="text-gray-500">No low stock products.</p>
        ) : (
          <ul className="space-y-2">
            {stats.lowStock.map(p => (
              <li key={p.id} className="p-3 bg-red-50 rounded-lg border text-red-600">
                {p.name} — {p.stock} left
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
