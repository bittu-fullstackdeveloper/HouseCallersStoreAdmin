// src/pages/MediaManager.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  FiTrash2,
  FiUpload,
  FiSearch,
  FiX,
  FiDownload,
  FiCheckSquare,
  FiSquare,
  FiFolder,
} from "react-icons/fi";

/**
 * Modern Media Manager
 * - Drag & drop + file picker
 * - Categories tabs
 * - Grid preview with hover actions
 * - Preview modal (image/video)
 * - Multi-select + bulk delete
 * - localStorage persistence
 */

const STORAGE_KEY = "media_store_v2";
const DEFAULT_CATEGORIES = ["All", "Product", "Category", "Banner", "Other"];

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function loadMedia() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveMedia(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore quota errors for demo
  }
}

export default function MediaManager() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null); // { item }
  const [selected, setSelected] = useState(new Set());
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setItems(loadMedia());
  }, []);

  useEffect(() => {
    saveMedia(items);
  }, [items]);

  const resetSelection = () => setSelected(new Set());

  const addFiles = (files, chosenCategory) => {
    if (!files || files.length === 0) return;
    const next = [...items];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Create a small meta object
        next.unshift({
          id: Date.now() + Math.random().toString(36).slice(2, 9),
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size || 0,
          data: reader.result,
          category: chosenCategory || category || "Other",
          uploadedAt: new Date().toISOString(),
        });
        setItems([...next]);
      };
      // If file is image or video read as DataURL
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const files = e.dataTransfer.files;
    addFiles(files, category === "All" ? "Product" : category);
  };

  const handleRemove = (id) => {
    const ok = window.confirm("Delete this media? This cannot be undone.");
    if (!ok) return;
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    // remove from selection if active
    if (selected.has(id)) {
      const setCopy = new Set(selected);
      setCopy.delete(id);
      setSelected(setCopy);
    }
  };

  const toggleSelect = (id) => {
    const setCopy = new Set(selected);
    if (setCopy.has(id)) setCopy.delete(id);
    else setCopy.add(id);
    setSelected(setCopy);
  };

  const bulkDelete = () => {
    if (selected.size === 0) return alert("No items selected.");
    if (!window.confirm(`Delete ${selected.size} selected items?`)) return;
    const next = items.filter((i) => !selected.has(i.id));
    setItems(next);
    resetSelection();
  };

  const downloadItem = (item) => {
    const a = document.createElement("a");
    a.href = item.data;
    a.download = item.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const filtered = items.filter((it) => {
    const matchesCategory = category === "All" ? true : it.category === category;
    const matchesSearch =
      !search ||
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      (it.category || "").toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Responsive columns calculated via Tailwind grid classes in markup

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <FiFolder /> Media Manager
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Upload and manage images/videos for products, banners & categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={bulkDelete}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
              >
                <FiTrash2 /> Delete ({selected.size})
              </button>
              <button
                onClick={() => {
                  // download all selected as separate downloads
                  filtered
                    .filter((i) => selected.has(i.id))
                    .forEach((i) => downloadItem(i));
                }}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
              >
                <FiDownload /> Download
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded shadow px-3 py-2">
            <FiSearch className="text-gray-400 dark:text-gray-300" />
            <input
              className="bg-transparent outline-none px-2 text-sm w-48 dark:text-gray-100"
              placeholder="Search name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-100"
            >
              {DEFAULT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label
              className="inline-flex items-center gap-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              title="Upload files"
            >
              <FiUpload />
              Upload
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => addFiles(e.target.files, category === "All" ? "Product" : category)}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Drag area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        className={`mb-6 rounded-lg border-2 ${
          dragOver ? "border-dashed border-indigo-400 bg-indigo-50/40" : "border-dashed border-gray-200 dark:border-gray-700"
        } p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition`}
      >
        <div>
          <h3 className="text-lg font-semibold dark:text-gray-100">Drag & Drop files here</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Or click <span className="font-medium">Upload</span> to select files manually.
          </p>
          <p className="text-xs text-gray-400 mt-2">Supports images & videos. Files are stored in browser localStorage (demo).</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <FiUpload /> Select Files
          </button>
          <button
            onClick={() => {
              // generate sample demo item
              const demoBlob = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='#6366f1'/><text x='50%' y='50%' fill='white' font-size='28' text-anchor='middle' dominant-baseline='central'>Demo Image</text></svg>`);
              const item = {
                id: Date.now() + Math.random(),
                name: "demo-image.svg",
                type: "image/svg+xml",
                size: 1024,
                data: demoBlob,
                category: category === "All" ? "Product" : category,
                uploadedAt: new Date().toISOString(),
              };
              setItems((prev) => [item, ...prev]);
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Add Demo
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="p-8 bg-white dark:bg-gray-800 rounded shadow text-center text-gray-500 dark:text-gray-400">
          No media found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => {
            const isImage = item.type.startsWith("image");
            const isVideo = item.type.startsWith("video");
            const isSelected = selected.has(item.id);
            return (
              <div
                key={item.id}
                className="relative bg-white dark:bg-gray-800 rounded overflow-hidden shadow hover:shadow-lg transition"
              >
                {/* selectable checkbox */}
                <button
                  onClick={() => toggleSelect(item.id)}
                  className={`absolute top-2 left-2 z-10 p-1 rounded ${isSelected ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-700 text-gray-600"} border`}
                  title={isSelected ? "Unselect" : "Select"}
                >
                  {isSelected ? <FiCheckSquare /> : <FiSquare />}
                </button>

                {/* hover overlay actions */}
                <div
                  className="cursor-pointer"
                  onClick={() => setPreview(item)}
                >
                  {isImage ? (
                    <img src={item.data} alt={item.name} className="w-full h-36 object-cover" />
                  ) : isVideo ? (
                    <video src={item.data} className="w-full h-36 object-cover" preload="metadata" />
                  ) : (
                    <div className="w-full h-36 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-300">{item.name}</span>
                    </div>
                  )}
                </div>

                <div className="p-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <div className="text-sm font-semibold dark:text-gray-100">{item.name}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-300">{item.category} • {formatBytes(item.size)}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => downloadItem(item)}
                        className="p-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        title="Download"
                      >
                        <FiDownload />
                      </button>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>

                {/* small footer */}
                <div className="p-2 border-t text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900">
                  <div className="flex justify-between">
                    <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    <span>{new Date(item.uploadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <div>
                <div className="font-semibold text-lg dark:text-gray-100">{preview.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{preview.category} • {formatBytes(preview.size)}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => downloadItem(preview)} className="px-3 py-1 bg-indigo-600 text-white rounded">Download</button>
                <button onClick={() => setPreview(null)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <FiX />
                </button>
              </div>
            </div>

            <div className="p-4">
              {preview.type.startsWith("image") ? (
                <img src={preview.data} alt={preview.name} className="w-full object-contain rounded" />
              ) : preview.type.startsWith("video") ? (
                <video controls src={preview.data} className="w-full rounded" />
              ) : (
                <div className="p-6 text-center">Preview not available for this file type.</div>
              )}
            </div>

            <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(preview.data);
                  alert("Data URL copied to clipboard (use carefully).");
                }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded"
              >
                Copy Data URL
              </button>
              <button onClick={() => setPreview(null)} className="px-3 py-1 bg-indigo-600 text-white rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
