import React, { useEffect, useState } from "react";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const dummyOrders = [
      { id: 101, status: "Pending", date: "2025-02-03", amount: 450, items: 3 },
      { id: 102, status: "Shipped", date: "2025-02-04", amount: 999, items: 1 },
      { id: 103, status: "Delivered", date: "2025-02-05", amount: 750, items: 2 },
      { id: 104, status: "Pending", date: "2025-02-06", amount: 1200, items: 5 },
    ];
    setOrders(dummyOrders);
  }, []);

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 text-sm rounded-full flex items-center gap-1 font-semibold shadow-sm";
    switch (status) {
      case "Pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100`}>
            <FiClock /> Pending
          </span>
        );
      case "Shipped":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100`}>
            <FiTruck /> Shipped
          </span>
        );
      case "Delivered":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100`}>
            <FiCheckCircle /> Delivered
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
        <FiPackage /> Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 p-10 bg-white dark:bg-gray-800 rounded-xl shadow">
          No orders found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Order #{order.id}</h2>
                {getStatusBadge(order.status)}
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <span className="font-semibold">Date:</span> {order.date}
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Items:</span> {order.items}
                </p>
                <p className="flex items-center gap-1">
                  <FiDollarSign /> <span className="font-semibold">Amount:</span> ₹{order.amount}
                </p>
              </div>

              <button className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white py-2 rounded-lg font-medium hover:scale-105 transform transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
