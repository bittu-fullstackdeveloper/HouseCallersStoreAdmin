

import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'
import { 
  FiHome, FiBox, FiLayers, FiDatabase, FiImage, 
  FiShoppingCart, FiSettings, FiFileText, FiLogOut, FiTrendingUp, FiUser,
  FiSun, FiMoon
} from 'react-icons/fi'
import { useDarkMode } from '../context/DarkModeContext' // Dark mode hook

export default function Layout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useDarkMode() // Dark mode state

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome /> },
    { name: 'Sales Dashboard', path: '/sales-dashboard', icon: <FiTrendingUp /> },
    { name: 'Product', path: '/products', icon: <FiBox /> },
    { name: 'Categories', path: '/categories', icon: <FiLayers /> },
    { name: 'Inventory', path: '/inventory', icon: <FiDatabase /> },
    { name: 'MediaManager', path: '/mediaManager', icon: <FiImage /> },
    { name: 'Orders', path: '/orders', icon: <FiShoppingCart /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
    { name: 'Profile', path: '/profile', icon: <FiUser /> },
    // { name: 'Blogs', path: '/blogs', icon: <FiFileText /> },
  ]

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to exit the Admin Panel?")
    if (confirmed) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r flex flex-col transition-colors duration-300">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="font-bold text-2xl text-indigo-600 mb-1">Product Store</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{user?.email}</p>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="mt-3 w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}

          {/* Logout Button */}
          <button
            className="mt-6 w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-700 transition-colors duration-200"
            onClick={handleLogout}
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
