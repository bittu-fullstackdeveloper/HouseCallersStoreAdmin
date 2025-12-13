import React from "react";
import {
  FiBox,
  FiLayers,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
} from "react-icons/fi";

export default function Dashboard() {
  // CATEGORY DATA
  const categories = [
    { name: "Cleaning Kit", total: 3, inStock: 2, outStock: 1 },
    { name: "Electrical Kit", total: 2, inStock: 1, outStock: 1 },
    { name: "Beauty Kit", total: 1, inStock: 0, outStock: 1 },
    { name: "Cloth Ware", total: 1, inStock: 1, outStock: 0 },
  ];

  // SALES DATA
  const todaySales = [
    { name: "Cleaning Kit", sold: 2, amount: 299 },
    { name: "Electrical Kit", sold: 1, amount: 499 },
    { name: "Beauty Kit", sold: 1, amount: 199 },
  ];

  const totalSoldToday = todaySales.reduce((sum, p) => sum + p.sold, 0);
  const totalPaymentToday = todaySales.reduce((sum, p) => sum + p.amount * p.sold, 0);
  const bestProduct = todaySales.reduce((max, p) => (p.sold > max.sold ? p : max), todaySales[0]);

  return (
    <div className="p-4">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        Product Store Dashboard
      </h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          color="from-blue-500 to-indigo-500"
          icon={<FiLayers size={24} />}
          label="Total Categories"
          value={categories.length}
        />

        <StatCard
          color="from-green-500 to-emerald-500"
          icon={<FiBox size={24} />}
          label="Total Products"
          value={categories.reduce((sum, cat) => sum + cat.total, 0)}
        />

        <StatCard
          color="from-yellow-500 to-orange-500"
          icon={<FiCheckCircle size={24} />}
          label="In Stock"
          value={categories.reduce((sum, cat) => sum + cat.inStock, 0)}
        />

        <StatCard
          color="from-red-500 to-pink-500"
          icon={<FiXCircle size={24} />}
          label="Out of Stock"
          value={categories.reduce((sum, cat) => sum + cat.outStock, 0)}
        />
      </div>

      {/* CATEGORY SECTION */}
      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
        Category Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 
                     hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <FiBox /> {cat.name}
            </h3>

            <div className="flex justify-between mt-5 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Total:</span> {cat.total}
              </p>
              <p className="text-green-600 font-semibold">
                In Stock: {cat.inStock}
              </p>
              <p className="text-red-600 font-semibold">
                Out: {cat.outStock}
              </p>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
}

/* ------------------------- COMPONENTS ------------------------- */

function StatCard({ color, icon, label, value }) {
  return (
    <div
      className={`p-6 rounded-xl text-white bg-gradient-to-r ${color} shadow-lg hover:scale-[1.03] transform transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{label}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 
                    hover:shadow-xl transition duration-300">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
      <p className="text-3xl font-bold mt-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        {icon} {value}
      </p>
    </div>
  );
}
