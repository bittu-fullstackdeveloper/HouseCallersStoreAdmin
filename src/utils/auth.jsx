import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const saved = JSON.parse(localStorage.getItem('admin_user') || 'null')
  const [user, setUser] = useState(saved)

  const login = (email, password) => {
    // mock login: accept any credential
    const u = { email }
    localStorage.setItem('admin_user', JSON.stringify(u))
    setUser(u)
    return true
  }
  const logout = () => {
    localStorage.removeItem('admin_user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
