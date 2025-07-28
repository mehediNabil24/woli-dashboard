import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Button, Form, Typography } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

import { setUser } from "../../../redux/features/user/userSlice";
import MenuItem from "../../layouts/Menu";
import { useSignInMutation } from "../../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;

// Zod schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password should be at least 6 characters long").min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signInUser, { isLoading }] = useSignInMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await signInUser(data).unwrap();

      if (res.success) {
        dispatch(
          setUser({
            user: res.data.user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );
        Cookies.set("token", res.data.accessToken);
        toast.success(res.message || "Login successful");
        navigate("/dashboard");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed, please try again.");
    }
  };

  return (
    <div>
      <MenuItem />
      <div className="w-full min-h-screen flex items-center justify-center bg-black pt-6 px-4">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg">
          <div className="mb-8 text-center">
            <Title level={2} style={{ color: "white" }}>
              Welcome Back!
            </Title>
            <Text style={{ color: "#FECD1C", fontWeight: "bold", fontSize: "24px" }}>Sign in to your account</Text>
          </div>

          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>

            {/* Email */}
            <Form.Item
              label={<Text style={{ color: "white" }}>Email address</Text>}
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter login mail"
                    style={{ color: "white", backgroundColor: "#1F2937" }}
                  />
                )}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={<Text style={{ color: "white" }}>Password</Text>}
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Enter Password"
                    iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    style={{ color: "white", backgroundColor: "#1F2937" }}
                  />
                )}
              />
            </Form.Item>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <Link to="/forget-password" style={{ color: "white", fontSize: "14px" }}>
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{ backgroundColor: "#FECD1C", borderColor: "#FECD1C", color: "black", fontWeight: "600" }}
              >
                Login Now
              </Button>
            </Form.Item>
          </Form>

          {/* Register Link */}
          <div className="mt-8 text-center text-white text-lg">
            <p>Didn’t have any account?</p>
            <Link to="/agent-request" style={{ color: "#FECD1C" }}>
              Request For New
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
