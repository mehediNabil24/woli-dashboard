"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import MenuItem from "../../layouts/Menu"
import { useForgetPasswordMutation } from "../../../redux/features/auth/authApi"

export default function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [forgatPassword, { isLoading }] = useForgetPasswordMutation()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset requested for:", email)
    try {
      const res = await forgatPassword({ email }).unwrap()
      console.log(object);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <MenuItem />
      <div className="min-h-screen bg-black flex lg:items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-wide">FORGET YOUR PASSWORD?</h1>
            <p className="text-gray-300 text-sm">{"You've forgot your password! Enter your email below"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Emily432@gmail.com"
                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                required
              />
            </div>

            <Link to="/verification-code">
              <button
                type="submit"
                className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Continue
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
