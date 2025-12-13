
import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiMinus,
  FiSearch,
  FiAlertTriangle,
  FiArchive,
} from "react-icons/fi";

export default function Inventory() {
  const STORAGE_KEY = "products";

  // Load products
  const loadProducts = () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const saveProducts = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  const adjust = (id, delta) => {
    const next = products.map((p) =>
      p.id === id ? { ...p, stock: Number(p.stock || 0) + delta } : p
    );
    setProducts(next);
    saveProducts(next);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-indigo-600">
          <FiArchive /> Inventory Management
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white px-3 py-2 rounded shadow border gap-2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none bg-transparent"
          />
        </div>
      </div>

      {/* If no products */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
          No products added yet.
        </div>
      )}

      {/* Product List */}
      <div className="space-y-4">
        {filtered.map((p) => {
          const lowStock = p.stock <= 5;

          return (
            <div
              key={p.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-100"
            >
              <div className="flex justify-between items-center">
                {/* Product Info */}
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    {p.name}

                    {lowStock && (
                      <span className="text-xs flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded">
                        <FiAlertTriangle /> Low Stock
                      </span>
                    )}
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">
                    Current Stock:{" "}
                    <span
                      className={
                        p.stock > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                      }
                    >
                      {p.stock}
                    </span>
                  </p>

                  {/* Stock Progress Bar */}
                  <div className="w-40 bg-gray-200 h-2 rounded mt-2">
                    <div
                      className={`h-2 rounded ${
                        p.stock <= 5 ? "bg-red-500" : "bg-indigo-500"
                      }`}
                      style={{
                        width: `${Math.min(p.stock, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Stock Controls */}
                <div className="flex gap-3">
                  <button
                    onClick={() => adjust(p.id, 1)}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1"
                  >
                    <FiPlus /> +1
                  </button>

                  <button
                    onClick={() => adjust(p.id, 5)}
                    className="px-3 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 flex items-center gap-1"
                  >
                    <FiPlus /> +5
                  </button>

                  <button
                    onClick={() => adjust(p.id, -1)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1"
                  >
                    <FiMinus /> -1
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Match Case */}
      {filtered.length === 0 && search.length > 0 && (
        <p className="mt-6 text-gray-500 text-center">No products found.</p>
      )}
    </div>
  );
}
