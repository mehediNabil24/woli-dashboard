/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import MenuItem from "../../layouts/Menu";
import { useResendCodeMutation, useVerifyEmailMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

export default function VerificationCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
const [resendCode] = useResendCodeMutation()
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const isComplete = code.every((digit) => digit !== "");

  const handleSubmit = async () => {
   

    try {
       if (!isComplete || !email) {
      toast.error("Please enter your email and complete the code.");
      return;
    }
      const token = code.join("");
      const res = await verifyEmail({ token, email }).unwrap();

      if (res?.success) {
        toast.success(res.message);
        // navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Verification failed.");
      console.log(error);
    }
  };

  const handleResendCode = async() => {
    console.log(email, "email",);
    try{
      const res = await resendCode({email:email}).unwrap()
      console.log(res, "res");
      if(res.success){
        toast.success(res.message)
      }else{
        toast.error(res.error)
      }
    }catch(error){
      console.log(error);
    }
    
  };

  return (
    <div>
      <MenuItem />
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <Link
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white tracking-wide">
              ENTER VERIFICATION CODE
            </h1>
            <p className="text-gray-300 text-sm">
              A 6-digit code was sent to your email
            </p>
          </div>

          {/* ✅ Email Input & Resend */}
          <div className="space-y-3">
            <label className="block text-white text-sm font-medium text-left">
              Enter Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-transparent border-2 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition"
            />

          </div>
          {/* 🔢 Code Input Fields */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-white text-sm font-medium text-left">
                Enter 6-digit Code
              </label>
              <div className="flex justify-start gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value.replace(/\D/g, ""))
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-white text-lg font-medium bg-transparent border-2 border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="•"
                    title={`Digit ${index + 1} of verification code`}
                  />
                ))}
              </div>
            </div>

            {/* 🔘 Submit Button */}
            <button
              onClick={handleSubmit}
              className={`w-full py-3 rounded-lg transition-colors font-bold ${isComplete && email
                ? "bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              disabled={!isComplete || !email}
            >
              {isLoading ? "Verifying..." : "Continue"}
            </button>
          </div>
          <button
            onClick={handleResendCode}
            className="text-yellow-400 hover:text-yellow-500 text-sm mt-1 cursor-pointer"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
