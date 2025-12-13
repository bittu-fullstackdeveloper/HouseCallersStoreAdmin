import React, {useState} from "react";

/**
 * ProductStore page
 * - shows category sections (Cleaning Kit, Electrical Kit, Beauty Kit, Cloth Ware)
 * - each product shows name and stock status; ability to toggle stock for demo
 * - This is a self-contained page that can be attached to your router and sidebar/menu.
 */

const initialData = [
  {
    category: "Cleaning Kit",
    products: [
      { id: "c-mask", name: "Mask", stock: 120 },
      { id: "c-gloves", name: "Gloves", stock: 50 },
      { id: "c-liquid", name: "Liquid", stock: 0 }
    ]
  },
  {
    category: "Electrical Kit",
    products: [
      { id: "e-drill", name: "Drill Kit", stock: 25 },
      { id: "e-electrician-bag", name: "Electrician Tool Bag", stock: 8 }
    ]
  },
  {
    category: "Beauty Kit",
    products: [
      { id: "b-coming", name: "Coming Soon", stock: 0 }
    ]
  },
  {
    category: "Cloth Ware",
    products: [
      { id: "cl-tshirt", name: "T-Shirt", stock: 200 }
    ]
  }
];

export default function ProductStore() {
  const [data, setData] = useState(initialData);

  function toggleStock(catIdx, prodIdx) {
    const next = JSON.parse(JSON.stringify(data));
    const prod = next[catIdx].products[prodIdx];
    prod.stock = prod.stock > 0 ? 0 : 10;
    setData(next);
  }

  return (
    <div style={{padding:20, fontFamily: 'Arial, sans-serif'}}>
      <h1>Product Store (Admin)</h1>
      <p>Categories and products with stock status. Click "Toggle Stock" to simulate stock in/out.</p>

      {data.map((cat, ci) => (
        <div key={cat.category} style={{marginBottom:24, border:"1px solid #eee", padding:12, borderRadius:8}}>
          <h2 style={{margin:0}}>{cat.category}</h2>
          <table style={{width:"100%", borderCollapse:"collapse", marginTop:8}}>
            <thead>
              <tr>
                <th style={{textAlign:"left", borderBottom:"1px solid #ddd", padding:8}}>Product Name</th>
                <th style={{textAlign:"left", borderBottom:"1px solid #ddd", padding:8}}>Stock</th>
                <th style={{textAlign:"left", borderBottom:"1px solid #ddd", padding:8}}>Status</th>
                <th style={{textAlign:"left", borderBottom:"1px solid #ddd", padding:8}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cat.products.map((p, pi) => (
                <tr key={p.id}>
                  <td style={{padding:8}}>{p.name}</td>
                  <td style={{padding:8}}>{p.stock}</td>
                  <td style={{padding:8}}>{p.stock>0 ? "In Stock" : "Out of Stock"}</td>
                  <td style={{padding:8}}>
                    <button onClick={() => toggleStock(ci, pi)}>Toggle Stock</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}