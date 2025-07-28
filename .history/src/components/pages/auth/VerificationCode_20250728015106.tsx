"use client"

import type React from "react"
import { useState, useRef } from "react"
import MenuItem from "../../layouts/Menu"

export default function VerificationCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }

    setCode(newCode)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "")
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
  }

  const isComplete = code.every((digit) => digit !== "")

  return (
    <div>
      <MenuItem/>
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white tracking-wide">ENTER VERIFICATION CODE</h1>
          <p className="text-gray-300 text-sm">Enter 6 digit code what sended to your email dh****@gmail.com</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-white text-sm font-medium text-left">Enter 6 digit Code</label>
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-white text-lg font-medium bg-transparent border-2 border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder={`•`}
                  title={`Digit ${index + 1} of verification code`}
                />
              ))}
            </div>
          </div>

          <button
            className={`w-full py-3 rounded-lg  transition-colors font-bold ${
              isComplete
                ? "bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isComplete}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}
