"use client";

import React, { useState, useRef } from "react";
import MenuItem from "../../layouts/Menu";
import { useVerifyEmailMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

export default function VerificationCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

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
    if (!isComplete || !email) {
      toast.error("Please enter your email and complete the code.");
      return;
    }

    try {
      const verificationCode = code.join("");
      const res = await verifyEmail({ verificationCode, email }).unwrap();

      if (res?.success) {
        toast.success(res.message);
        // navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Verification failed.");
      console.log(error);
    }
  };

  const handleResendCode = () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    // এখানে resend কোডের জন্য API কল করতে পারো
    toast.success("Verification code resent to: " + email);
  };

  return (
    <div>
      <MenuItem />
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
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
              placeholder="your-email@example.com"
              className="w-full p-3 rounded-lg bg-transparent border-2 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition"
            />
            <button
              onClick={handleResendCode}
              className="text-yellow-400 hover:text-yellow-500 text-sm mt-1"
            >
              Resend Code
            </button>
          </div>

        
        </div>
      </div>
    </div>
  );
}
