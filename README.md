# React Admin Panel (Local Mock Backend)

This is a minimal React + Vite admin panel example that uses **localStorage** as a mock backend so you can run it immediately without any server.

## Features
- Login screen (mock)
- Dashboard
- Jobs management (Add / Edit / Toggle Open/Closed / Delete)
- Blogs management (Add / Edit / Publish / Delete)
- Uses localStorage as data store (no backend required)

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open the URL shown by vite (usually http://localhost:5173)

## Notes
- This is a starter template. For production, replace localStorage logic with real APIs (Node.js + Express + MongoDB or other).
- Tailwind is included; edit `index.css` to change styles.

