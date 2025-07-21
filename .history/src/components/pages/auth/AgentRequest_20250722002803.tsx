"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function AgentRequest() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    dateOfBirth: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-wide">{"LET'S BECOME AGENT"}</h1>
          <h2 className="text-xl font-semibold text-yellow-400">REQUEST FOR NEW ACCOUNT</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white text-sm">
              Full Name
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact" className="text-white text-sm">
              Contact
            </Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              placeholder="Enter phone number"
              value={formData.contact}
              onChange={handleInputChange}
              className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter login mail"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-white text-sm">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400 [&::-webkit-calendar-picker-indicator]:invert"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md transition-colors"
          >
            Create an Account
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Already have any account?{" "}
            <Link href="/signin" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Sign In now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
