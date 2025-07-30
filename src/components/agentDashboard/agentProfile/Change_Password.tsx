/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Input } from "antd";
import { useState } from "react";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const Change_Password = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (field: string, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const { oldPassword, newPassword } = passwords;

    if (!oldPassword || !newPassword) {
      toast.error("Both fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    try {
      const res = await changePassword(passwords).unwrap();
      if (res.success) {
        toast.success(res.message || "Password changed successfully!");
        setPasswords({ oldPassword: "", newPassword: "" });
      } else {
        toast.error(res.message || "Password change failed.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const handleCancel = () => {
    setPasswords({ oldPassword: "", newPassword: "" });
    toast.info("Password change canceled.");
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
      <div className="grid grid-cols-1 gap-y-4">
        {["oldPassword", "newPassword"].map((field, i) => (
          <div className="mb-4" key={i}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field === "oldPassword" ? "Old" : "New"} Password
            </label>
            <Input.Password
              placeholder={`${field === "oldPassword" ? "Old" : "New"} Password`}
              size="large"
              className="custom-input"
              value={passwords[field as keyof typeof passwords]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-6">
        <Button
          type="primary"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 20px",
            height: "auto",
            fontWeight: 600,
          }}
          onClick={handleSave}
          loading={isLoading}
        >
          Save Now
        </Button>
        <Button
          type="default"
          className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300 rounded-md px-6 py-2 h-auto font-semibold"
          onClick={handleCancel}
        >
          Not Now
        </Button>
      </div>
    </div>
  );
};

export default Change_Password;
