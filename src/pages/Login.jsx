import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'
import { FiCheckCircle, FiX, FiEye, FiEyeOff } from "react-icons/fi"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [shake, setShake] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    if (password === "123456") {
      login(email, password)
      setSuccessMessage("Login Successful! Redirecting...")
      setErrorMessage("")

      setTimeout(() => navigate('/'), 1500)
    } else {
      setErrorMessage("Wrong Password! Please try again.")
      setSuccessMessage("")
      
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const closeSuccess = () => setSuccessMessage("")
  const closeError = () => setErrorMessage("")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={submit}
        className={`w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 
          ${shake ? "animate-[shake_0.3s_ease-in-out]" : ""}`}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Admin Login
        </h1>

        {/* EMAIL */}
        <label className="block mb-2 font-semibold">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-indigo-300"
        />

        {/* PASSWORD */}
        <label className="block mb-2 font-semibold">Password</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 pr-12"
          />

          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-600 cursor-pointer hover:text-gray-800"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <button className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">
          Login
        </button>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="relative mt-4 p-4 rounded-xl bg-green-50 border border-green-300 shadow-lg animate-slide-up backdrop-blur-md">

            <div className="flex items-center gap-3 justify-center">
              <FiCheckCircle className="text-green-600 text-2xl animate-pulse-slow" />
              <span className="font-semibold text-green-700 text-lg tracking-wide">
                {successMessage}
              </span>
            </div>

            <button 
              onClick={closeSuccess} 
              className="absolute right-3 top-3 text-green-700 hover:text-green-900"
            >
              <FiX size={18} />
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="relative mt-4 p-4 rounded-xl bg-red-50 border border-red-300 shadow-lg animate-slide-up backdrop-blur-md">

            <div className="flex items-center gap-3 justify-center">
              <FiX className="text-red-600 text-2xl animate-pulse-slow" />
              <span className="font-semibold text-red-700 text-lg tracking-wide">
                {errorMessage}
              </span>
            </div>

            <button 
              onClick={closeError} 
              className="absolute right-3 top-3 text-red-700 hover:text-red-900"
            >
              <FiX size={18} />
            </button>
          </div>
        )}

      </form>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }

        @keyframes pulseSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 1.4s infinite;
        }
      `}</style>

    </div>
  )
}
