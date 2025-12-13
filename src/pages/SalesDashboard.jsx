import React, { useEffect, useState } from "react";

// Generate 50 dummy sales
function generateDummySales() {
  const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Phone", "Headset"];
  const sales = [];

  for (let i = 1; i <= 50; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const qty = Math.floor(Math.random() * 5) + 1;
    const price = Math.floor(Math.random() * 2000) + 500;
    const date = `2025-12-${String((i % 30) + 1).padStart(2, "0")}`;
    const time = `${String(i % 12 || 12).padStart(2, "0")}:00 ${i % 2 === 0 ? "AM" : "PM"}`;
    sales.push({ id: i, name: randomProduct, qty, price, date, time });
  }

  return sales;
}

export default function SalesDashboard() {
  const [sales, setSales] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [topProductSearch, setTopProductSearch] = useState(""); // NEW: Search for top product

  // Date-wise summary
  const [dateSummary, setDateSummary] = useState([]);
  const [dateSummaryPage, setDateSummaryPage] = useState(1);
  const dateSummaryItemsPerPage = 5;

  // Top selling product per date
  const [topProductDate, setTopProductDate] = useState([]);
  const [topProductPage, setTopProductPage] = useState(1);
  const topProductItemsPerPage = 5;

  // Complete Sales List
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const dummy = generateDummySales();
    setSales(dummy);

    // Date Wise Sale Summary (total sales per date)
    const dateMap = {};
    dummy.forEach((s) => {
      if (!dateMap[s.date]) dateMap[s.date] = 0;
      dateMap[s.date] += s.qty * s.price;
    });
    const dateSummaryList = Object.entries(dateMap).map(([date, total]) => ({ date, total }));
    setDateSummary(dateSummaryList);

    // Top Selling Product per Date
    const topDateMap = {};
    dummy.forEach((s) => {
      if (!topDateMap[s.date]) topDateMap[s.date] = {};
      if (!topDateMap[s.date][s.name]) topDateMap[s.date][s.name] = 0;
      topDateMap[s.date][s.name] += s.qty;
    });

    const topProductList = Object.entries(topDateMap).map(([date, products]) => {
      const top = Object.entries(products).sort((a, b) => b[1] - a[1])[0];
      return { date, product: top[0], sold: top[1] };
    });
    setTopProductDate(topProductList);
  }, []);

  // PRODUCT SEARCH + PRIORITY SORTING
  const filteredSales = sales
    .filter((s) => s.name.toLowerCase().includes(searchProduct.toLowerCase()))
    .sort((a, b) => {
      if (!searchProduct) return 0;
      return (
        b.name.toLowerCase().includes(searchProduct.toLowerCase()) -
        a.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
    });

  const currentItems = filteredSales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  // DATE WISE SUMMARY PAGINATION
  const filteredDateSummary = dateSummary.filter((d) => d.date.includes(dateSearch));
  const paginatedDateSummary = filteredDateSummary.slice(
    (dateSummaryPage - 1) * dateSummaryItemsPerPage,
    dateSummaryPage * dateSummaryItemsPerPage
  );
  const totalDatePages = Math.ceil(filteredDateSummary.length / dateSummaryItemsPerPage);

  // TOP PRODUCT PER DATE PAGINATION + SEARCH PRIORITY
  const filteredTopProductDate = topProductDate
    .filter((d) => d.date.includes(dateSearch))
    .sort((a, b) => {
      if (!topProductSearch) return 0;
      // Product matching search comes first
      return (
        b.product.toLowerCase().includes(topProductSearch.toLowerCase()) -
        a.product.toLowerCase().includes(topProductSearch.toLowerCase())
      );
    });

  const paginatedTopProductDate = filteredTopProductDate.slice(
    (topProductPage - 1) * topProductItemsPerPage,
    topProductPage * topProductItemsPerPage
  );
  const totalTopProductPages = Math.ceil(filteredTopProductDate.length / topProductItemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Sales Dashboard</h1>

      {/* Date Wise Sale Summary */}
      <h2 className="text-2xl font-bold mb-3">📅 Date Wise Sale Summary</h2>
      <input
        type="text"
        placeholder="Search date (YYYY-MM-DD)..."
        value={dateSearch}
        onChange={(e) => {
          setDateSearch(e.target.value);
          setDateSummaryPage(1);
          setTopProductPage(1);
        }}
        className="w-full p-3 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border rounded-xl bg-white shadow-md">
          <thead className="bg-blue-200">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Total Sales (₹)</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDateSummary.map((s, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-3 border">{s.date}</td>
                <td className="p-3 border font-bold text-blue-600">₹ {s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button onClick={() => dateSummaryPage > 1 && setDateSummaryPage(dateSummaryPage - 1)} className="px-3 py-1 bg-gray-300 rounded">
            Prev
          </button>
          {Array.from({ length: totalDatePages }, (_, i) => (
            <button
              key={i}
              onClick={() => setDateSummaryPage(i + 1)}
              className={`px-3 py-1 rounded ${dateSummaryPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => dateSummaryPage < totalDatePages && setDateSummaryPage(dateSummaryPage + 1)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* Top Selling Product per Date */}
      <h2 className="text-2xl font-bold mb-3 mt-8">🔥 Top Selling Product per Date</h2>
      
      {/* NEW SEARCH BAR FOR TOP PRODUCT */}
      <input
        type="text"
        placeholder="Search Top Product name..."
        value={topProductSearch}
        onChange={(e) => {
          setTopProductSearch(e.target.value);
          setTopProductPage(1);
        }}
        className="w-full p-3 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-green-400 mb-4"
      />

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border rounded-xl bg-white shadow-md">
          <thead className="bg-blue-200">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Top Product</th>
              <th className="p-3 border">Qty Sold</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTopProductDate.map((s, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-3 border">{s.date}</td>
                <td className="p-3 border font-semibold">{s.product}</td>
                <td className="p-3 border font-bold text-blue-600">{s.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button onClick={() => topProductPage > 1 && setTopProductPage(topProductPage - 1)} className="px-3 py-1 bg-gray-300 rounded">
            Prev
          </button>
          {Array.from({ length: totalTopProductPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setTopProductPage(i + 1)}
              className={`px-3 py-1 rounded ${topProductPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => topProductPage < totalTopProductPages && setTopProductPage(topProductPage + 1)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* PRODUCT SEARCH ABOVE COMPLETE LIST */}
      <h2 className="text-2xl font-bold mb-3 mt-10">🔍 Search Product</h2>
      <input
        type="text"
        placeholder="Search product name..."
        value={searchProduct}
        onChange={(e) => {
          setSearchProduct(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full p-3 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-green-400 mb-5"
      />

      {/* Complete Sales List */}
      <h2 className="text-2xl font-bold mb-4">📦 Complete Sales List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border rounded-xl bg-white shadow-md">
          <thead className="bg-blue-300">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Qty</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="p-3 border">{item.id}</td>
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">{item.time}</td>
                <td className="p-3 border font-semibold">{item.name}</td>
                <td className="p-3 border text-center">{item.qty}</td>
                <td className="p-3 border">₹ {item.price}</td>
                <td className="p-3 border font-semibold text-blue-700">₹ {item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
