/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import MenuItem from "../../layouts/Menu"
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi"
import { useNavigate, useSearchParams } from "react-router"
import { toast } from "sonner"

export default function SetNewPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const navigate = useNavigate()
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!password || !confirmPassword) {
    toast.error("Please fill in both fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const res = await resetPassword({ newPassword: confirmPassword, email, token }).unwrap();

    if (res?.success) {
      toast.success(res.message);
      navigate("/");
    } else {
      toast.error(res.message);
    }
  } catch (error: any) {
    toast.error(error?.data?.message || "Something went wrong");
    console.error(error);
  }
};


  return (
    <div>
      <MenuItem />
      <div className="min-h-screen bg-[#000000] flex lg:items-start justify-center p-4">
        <div className="w-full max-w-md space-y-6 mt-24">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-wide">SET NEW PASSWORD</h1>
            <p className="text-gray-300 text-sm">Please do not share your password with anyone. Thank you!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-white text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-white text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#fbbf24] cursor-pointer hover:bg-[#f59e0b] text-black font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:ring-offset-2 focus:ring-offset-[#2a2a2a]"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
