import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../../../../redux/api/auth/authApi";
import { setUser } from "../../../../redux/features/user/userSlice";
import { Button } from "antd";

// Define Zod schema for validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const token = Cookies.get("token");
  console.log("Token:", token); // Debugging line to check token
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signIn({ email: data.email, password: data.password }).unwrap();
      console.log('response', response);

      if (response) {
        // Save user data and token in Redux
        dispatch(setUser({ user: response.data.user, token: response.data.accessToken }));

        // Save token to cookies (if rememberMe is checked)
        Cookies.set("token", response.data.accessToken);

        // Show success toast
        toast.success("Login successful, redirecting...");

        // Redirect based on user role
        const userRole = response.data.user.role;
        if (userRole === "ADMIN") {
          navigate("/admin");
        } else if (userRole === "USER") {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      toast.error("Login failed, please try again.");
      console.error("Login error:", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="lg:min-w-[500px] h-full mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white uppercase">Welcome Back!</h1>
          <p className="text-3xl font-bold text-[#FECD1C] uppercase">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium block text-white">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="georgiayoung@example.com"
              {...register("email")}
              className={`w-full text-white px-3 py-2 border border-white ${errors.email ? "border-red-500" : "border-gray-200"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium block text-white">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                {...register("password")}
                className={`w-full px-3 py-2 text-white border border-white ${errors.password ? "border-red-500" : "border-gray-200"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Remember Me Checkbox */}
          {/* <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-500">Remember Me</label>
          </div> */}
          <div>
            <h2 className="mb-6 text-end text-[13px] font-medium text-white">
              Forgot Password?
            </h2>

          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#FECD1C] text-black font-semibold py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login Now"}
          </button>
        </form>
        {/* Register */}
        <div className="flex flex-col items-center text-center mt-8 text-sm text-white space-y-2">
          <h1>Didn’t have any account?</h1>
          <a href="/" className="text-yellow-400 hover:underline">
            Register Now
          </a>
        </div>

      </div>
    </div>
  );
}