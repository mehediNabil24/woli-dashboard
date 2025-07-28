"use client";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res: any = await login(data);

      if (res?.data?.success) {
        const { user, accessToken: token, refreshToken } = res.data;

        dispatch(setUser({ user, accessToken: token, refreshToken }));
        Cookies.set("token", token);

        toast.success(res.data.message || "Login successful!");
        router.push("/dashboard"); // ✅ redirect user
        reset();
      } else {
        toast.error(res?.error?.data?.message || "Login failed!");
      }
    } catch (err: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto mt-10">
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md ${
          isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-500"
        }`}
      >
        {isLoading ? "Logging in..." : "Login Now"}
      </button>
    </form>
  );
};

export default Login;
