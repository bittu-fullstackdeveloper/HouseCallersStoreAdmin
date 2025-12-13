import React, { useEffect, useState } from "react";

export default function Categories() {
  const STORAGE_KEY = "categories";

  const loadCategories = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const saveCategories = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setList(loadCategories());
  }, []);

  const add = () => {
    const trimmed = name.trim();
    if (!trimmed) return alert("Category name cannot be empty!");
    if (list.includes(trimmed)) return alert("Category already exists!");
    const next = [...list, trimmed];
    setList(next);
    saveCategories(next);
    setName("");
  };

  const remove = (c) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${c}"?`);
    if (!confirmed) return;
    const next = list.filter((x) => x !== c);
    setList(next);
    saveCategories(next);
  };

  const clearAll = () => {
    const confirmed = window.confirm("Are you sure you want to delete all categories?");
    if (!confirmed) return;
    setList([]);
    saveCategories([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") add();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Categories</h1>

      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Add Category</h3>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            placeholder="Category name"
          />
          <button
            onClick={add}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
        {list.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-3 text-red-600 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-2">
        {list.map((c) => (
          <div
            key={c}
            className="p-3 bg-white dark:bg-gray-800 rounded flex justify-between items-center shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="text-gray-800 dark:text-gray-200">{c}</div>
            <button
              onClick={() => remove(c)}
              className="px-3 py-1 text-red-600 border rounded hover:bg-red-50 dark:hover:bg-red-700 dark:hover:text-white transition"
            >
              Delete
            </button>
          </div>
        ))}
        {list.length === 0 && <p className="text-gray-500 dark:text-gray-400">No categories yet.</p>}
      </div>
    </div>
  );
}
