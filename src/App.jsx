// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'
// import Products from './pages/Products'
// import Categories from './pages/Categories'
// import Inventory from './pages/Inventory'
// import MediaManager from './pages/MediaManager'
// import Orders from './pages/Orders'
// import Settings from './pages/Settings'
// import Blogs from './pages/Blogs'
// import SalesDashboard from './pages/SalesDashboard'
// import Profiles from './pages/Profiles'
// import Layout from './components/Layout'
// import { AuthProvider, useAuth } from './utils/auth'

// function PrivateRoute({ children }) {
//   const { user } = useAuth()
//   return user ? children : <Navigate to="/login" replace />
// }

// export default function App(){
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={
//           <PrivateRoute>
//             <Layout />
//           </PrivateRoute>
//         }>
//           <Route index element={<Dashboard />} />
//           <Route path="products" element={<Products />} />
//           <Route path="categories" element={<Categories />} />
//           <Route path="inventory" element={<Inventory />} />
//           <Route path="mediaManager" element={<MediaManager />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="blogs" element={<Blogs />} />
//           <Route path="/sales-dashboard" element={<SalesDashboard />} />
//           <Route path="/profile" element={<Profiles />} />

//         </Route>
//       </Routes>
//     </AuthProvider>
//   )
// }

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Inventory from './pages/Inventory'
import MediaManager from './pages/MediaManager'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
// import Blogs from './pages/Blogs'
import SalesDashboard from './pages/SalesDashboard'
import Profiles from './pages/Profiles'
import Layout from './components/Layout'
import { AuthProvider, useAuth } from './utils/auth'
import { DarkModeProvider } from './context/DarkModeContext' 

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App(){
  return (
    <AuthProvider>
      <DarkModeProvider> {/* Wrap app with DarkModeProvider */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="mediaManager" element={<MediaManager />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
            {/* <Route path="blogs" element={<Blogs />} /> */}
            <Route path="sales-dashboard" element={<SalesDashboard />} />
            <Route path="profile" element={<Profiles />} />
          </Route>
        </Routes>
      </DarkModeProvider>
    </AuthProvider>
  )
}
