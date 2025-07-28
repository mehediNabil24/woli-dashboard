"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate, } from "react-router-dom"
import MenuItem from "../../layouts/Menu"
import { useAgentRequestMutation } from "../../../redux/features/auth/authApi"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

export default function AgentRequest() {

      const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        password: "",
        dateOfBirth: "",
    })
    const route = useNavigate()
    const [agentRequest, { isLoading }] = useAgentRequestMutation()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const agentData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            contact: formData.contact,
            email: formData.email,
            password: formData.password,
            dateOfBirth: formData.dateOfBirth
        }
        console.log(agentData, "agentData");
        try {
            const res = await agentRequest(agentData).unwrap()
            console.log(res, "res");
            
            if (res.success) {
                toast.success(res.message)
                route(`/verification-code?verifyEmail=${formData.email}`)
            } else {
                toast.error(res.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <MenuItem />
            <div className="min-h-screen bg-[#000000] flex lg:items-center justify-center p-6">
                <div className="lg:min-w-[500px] h-full mx-auto  space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-[30px] text-center md:text-[56px] font-bold text-white tracking-wide">{"LET'S BECOME AGENT"}</h1>
                        <h2 className="text-[30px] text-center md:text-[56px] font-bold text-yellow-400">REQUEST FOR NEW ACCOUNT</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-white text-sm font-medium">
                                Full Name
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                                    required
                                />
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="contact" className="block text-white text-sm font-medium">
                                Contact
                            </label>
                            <input
                                id="contact"
                                name="contact"
                                type="tel"
                                placeholder="Enter phone number"
                                value={formData.contact}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-white text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter login mail"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <label htmlFor="password" className="block text-white text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter login password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors pr-10"
                                required
                            />

                          
                            <div
                                className="absolute right-3 top-[38px] cursor-pointer text-gray-400 hover:text-yellow-400"
                                onClick={togglePassword}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="dateOfBirth" className="block text-white text-sm font-medium">
                                Date of Birth
                            </label>
                            <input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >

                            {isLoading ? "Create an Account..." : "Create an Account"}
                        </button>
                    </form>

                    <p className="text-white text-[20px] text-center">
                        Already have an account? <br />
                        <Link
                            to="/"
                            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                        >
                            Sign In now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
