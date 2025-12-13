import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

/* ------------------ Banner Form ------------------ */
function BannerForm({ onSave, initial }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [image, setImage] = useState(initial?.image || '')
  const [link, setLink] = useState(initial?.link || '')

  useEffect(() => {
    setTitle(initial?.title || '')
    setImage(initial?.image || '')
    setLink(initial?.link || '')
  }, [initial])

  return (
    <form onSubmit={e => {
      e.preventDefault()
      onSave({ id: initial?.id || uuidv4(), title, image, link })
    }}>
      <div className="grid grid-cols-1 gap-3">
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Banner Title" 
          className="p-2 border rounded" 
        />
        <input 
          value={image} 
          onChange={e => setImage(e.target.value)} 
          placeholder="Image URL" 
          className="p-2 border rounded" 
        />
        <input 
          value={link} 
          onChange={e => setLink(e.target.value)} 
          placeholder="Redirect Link (optional)" 
          className="p-2 border rounded" 
        />
      </div>
      <div className="mt-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded">Save Banner</button>
      </div>
    </form>
  )
}

/* ------------------ Main Component ------------------ */
export default function Banners() {
  const [banners, setBanners] = useState([])
  const [editing, setEditing] = useState(null)

  /* ------------------ Save Banner ------------------ */
  const saveBanner = (item) => {
    const exists = banners.find(b => b.id === item.id)
    const next = exists ? banners.map(b => b.id === item.id ? item : b) : [item, ...banners]
    setBanners(next)
    setEditing(null)
  }

  /* ------------------ Delete Banner ------------------ */
  const removeBanner = (id) => {
    const next = banners.filter(b => b.id !== id)
    setBanners(next)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Banners</h1>

      {/* Add / Edit Banner Form */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Add / Edit Banner</h3>
        <BannerForm onSave={saveBanner} initial={editing} />
      </div>

      {/* Banner List */}
      <div className="space-y-4">
        {banners.map(b => (
          <div key={b.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h4 className="font-bold">{b.title}</h4>
              <p className="text-sm text-gray-600">
                Image: <a href={b.image} target="_blank" rel="noreferrer" className="text-blue-500 underline">{b.image}</a>
              </p>
              {b.link && <p className="text-sm text-gray-600">
                Link: <a href={b.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">{b.link}</a>
              </p>}
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => setEditing(b)} 
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => removeBanner(b.id)} 
                className="px-3 py-1 border rounded text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {banners.length === 0 && <p className="text-gray-500">No banners yet.</p>}
      </div>
    </div>
  )
}
