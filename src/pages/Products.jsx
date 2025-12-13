import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* ------------------------------------
    Local Storage Helpers
------------------------------------ */
const read = (key, seed = []) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
};

const write = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/* ------------------------------------
    Seed Default Data
------------------------------------ */
const SEED_CATEGORIES = ["Cleaning Kit", "Electrical Kit", "Beauty Kit", "Cloth Ware"];

const SEED_PRODUCTS = [
  { id: "p1", name: "Mask", price: 50, category: "Cleaning Kit", stock: 10, desc: "Safety mask", status: "published", image: "", discount: 20, offerFrom: "2025-12-10", offerTo: "2025-12-20" },
  { id: "p2", name: "Gloves", price: 80, category: "Cleaning Kit", stock: 0, desc: "Hand gloves", status: "published", image: "", discount: 10, offerFrom: "2025-12-05", offerTo: "2025-12-15" },
  { id: "p4", name: "Electric Drill", price: 1200, category: "Electrical Kit", stock: 5, desc: "Drilling tool", status: "published", image: "", discount: 15, offerFrom: "2025-12-01", offerTo: "2025-12-31" },
];

/* ------------------------------------
      PRODUCT FORM COMPONENT
------------------------------------ */
function ProductForm({ onSave, initial, categories }) {
  const [name, setName] = useState(initial?.name || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [category, setCategory] = useState(initial?.category || categories[0]);
  const [stock, setStock] = useState(initial?.stock || 0);
  const [desc, setDesc] = useState(initial?.desc || "");
  const [status, setStatus] = useState(initial?.status || "draft");
  const [image, setImage] = useState(initial?.image || "");
  const [discount, setDiscount] = useState(initial?.discount || 0);
  const [offerFrom, setOfferFrom] = useState(initial?.offerFrom || "");
  const [offerTo, setOfferTo] = useState(initial?.offerTo || "");

  useEffect(() => {
    setName(initial?.name || "");
    setPrice(initial?.price || "");
    setCategory(initial?.category || categories[0]);
    setStock(initial?.stock || 0);
    setDesc(initial?.desc || "");
    setStatus(initial?.status || "draft");
    setImage(initial?.image || "");
    setDiscount(initial?.discount || 0);
    setOfferFrom(initial?.offerFrom || "");
    setOfferTo(initial?.offerTo || "");
  }, [initial, categories]);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          id: initial?.id || uuidv4(),
          name,
          price: Number(price),
          category,
          stock: Number(stock),
          desc,
          status,
          image,
          discount: Number(discount),
          offerFrom,
          offerTo,
        });
      }}
    >
      <div className="grid grid-cols-2 gap-3">

        <input value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Product Name" className="p-2 border rounded" required />

        <input value={price} type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price" className="p-2 border rounded" required />

        <select value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input value={stock} type="number"
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock" className="p-2 border rounded" />

        <input value={discount} type="number"
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Discount %" className="p-2 border rounded" />

        <input value={offerFrom} type="date"
          onChange={(e) => setOfferFrom(e.target.value)}
          className="p-2 border rounded" placeholder="Offer From" />

        <input value={offerTo} type="date"
          onChange={(e) => setOfferTo(e.target.value)}
          className="p-2 border rounded" placeholder="Offer To" />

        <textarea value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="p-2 border rounded col-span-2"
          rows={3} placeholder="Short description" />

        <select value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded col-span-2">
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Product Image</label>
          {image && <img src={image} alt="preview" className="w-32 h-32 object-cover mb-2 rounded" />}
          <input type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="p-2 border rounded w-full" />
        </div>

      </div>

      <div className="mt-3">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          Save Product
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------
          MAIN PAGE
------------------------------------ */
export default function Products() {

  const [categories] = useState(read("categories", SEED_CATEGORIES));
  const [products, setProducts] = useState(read("products", SEED_PRODUCTS));
  const [editing, setEditing] = useState(null);

  /* Save product */
  const save = (item) => {
    const exists = products.some((p) => p.id === item.id);
    const next = exists
      ? products.map((p) => (p.id === item.id ? item : p))
      : [item, ...products];

    setProducts(next);
    write("products", next);
    setEditing(null);
  };

  /* Delete product */
  const remove = (id) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    write("products", next);
  };

  /* Toggle In-out Stock */
  const toggleStock = (id) => {
    const next = products.map((p) =>
      p.id === id ? { ...p, stock: p.stock > 0 ? 0 : 10 } : p
    );
    setProducts(next);
    write("products", next);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* FORM */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Add / Edit Product</h3>
        <ProductForm onSave={save} initial={editing} categories={categories} />
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {products.map((p) => {
          const discountedPrice = calculateDiscountedPrice(p.price, p.discount);
          const isOfferActive = p.offerFrom && p.offerTo && new Date() >= new Date(p.offerFrom) && new Date() <= new Date(p.offerTo);

          return (
            <div key={p.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded" />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded text-gray-400">No Image</div>
                )}

                <div>
                  <h4 className="font-bold">
                    {p.name}{" "}
                    <span className={p.stock > 0 ? "text-green-600" : "text-red-500"}>
                      ({p.stock > 0 ? "In Stock" : "Out of Stock"})
                    </span>
                  </h4>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {p.category}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>

                  {isOfferActive && (
                    <p className="mt-1 text-green-700 dark:text-green-400 text-sm font-semibold">
                      Offer: {p.discount}% OFF (Valid: {p.offerFrom} to {p.offerTo})
                    </p>
                  )}

                  <p className="mt-1 text-lg font-semibold">
                    Price:{" "}
                    {isOfferActive ? (
                      <>
                        <span className="line-through text-gray-400 dark:text-gray-500">₹{p.price}</span>{" "}
                        <span className="text-indigo-600 dark:text-indigo-400">₹{discountedPrice}</span>
                      </>
                    ) : (
                      <>₹{p.price}</>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <button onClick={() => setEditing(p)}
                  className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Edit
                </button>

                <button onClick={() => toggleStock(p.id)}
                  className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Toggle Stock
                </button>

                <button onClick={() => remove(p.id)}
                  className="px-3 py-1 border rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-600 dark:hover:text-white transition">
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {products.length === 0 &&
          <p className="text-gray-500 dark:text-gray-400">No products yet.</p>}
      </div>
    </div>
  );
}
