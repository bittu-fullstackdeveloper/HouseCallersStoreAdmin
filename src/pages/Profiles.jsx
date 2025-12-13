
import React, { useState, useEffect } from "react";

export default function Profiles() {
  // Dummy users
  const DUMMY_USERS = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 2 === 0 ? "Admin" : "User",
    lastLogin: `2025-12-${(i % 30) + 1} 10:00 AM`,
    status: i % 3 === 0 ? "Inactive" : "Active"
  }));

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [search, setSearch] = useState("");

  const USERS_PER_PAGE = 10;

  useEffect(() => {
    setUsers(DUMMY_USERS);
  }, []);

  /* -----------------------------------
        SEARCH FILTER
  ----------------------------------- */
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  /* -----------------------------------
        PAGINATION
  ----------------------------------- */
  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  /* -----------------------------------
       TOGGLE ACTIVE / INACTIVE
  ----------------------------------- */
  const toggleStatus = (id) => {
    const updated = users.map((u) =>
      u.id === id
        ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
        : u
    );
    setUsers(updated);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Profiles</h1>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search user by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to page 1 when search
          }}
          className="w-full p-3 border rounded shadow-sm outline-none"
        />
      </div>

      {/* Profiles Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Last Login</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-600">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={user.status === "Active"}
                        onChange={() => toggleStatus(user.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500
                                    peer-focus:ring-2 peer-focus:ring-green-300 transition-all duration-300"></div>
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full
                                    transition-transform duration-300
                                    ${user.status === "Active" ? "translate-x-5" : ""}`}
                      ></div>
                    </label>

                    {/* NEW STATUS TEXT */}
                    <span
                      className={`text-sm font-semibold ${
                        user.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {user.status === "Active"
                        ? "User Active"
                        : "User Inactive"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
 