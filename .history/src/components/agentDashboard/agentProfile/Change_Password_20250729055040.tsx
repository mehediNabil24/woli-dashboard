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
    const [changePassword] = useChangePasswordMutation()
    const handleChange = (field: string, value: string) => {
        setPasswords((prev) => ({
            ...prev,
            [field]: value,
        }));
        console.log(`${field} password:`, value);
    };

    const handleSave = async () => {
        console.log("Password change saved." + passwords.);
            return
        try {
            const res = await changePassword(passwords).unwrap()
            console.log(res);

            if (res.success) {
                toast.success(res.message);
                setPasswords({
                    oldPassword: "",
                    newPassword: "",

                });
            } else {
                toast.error(res.error);
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message);

        }
        // You can add password validation here
    };

    const handleCancel = () => {
        console.log("Password change canceled.");
        setPasswords({
            oldPassword: "",
            newPassword: "",

        });
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
            <div className="grid grid-cols-1 gap-y-4">
                {["old", "new",].map((field, i) => (
                    <div className="mb-4" key={i}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1)} Password
                        </label>
                        <Input.Password
                            placeholder={` Password`}
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
                    className="save-now-btn"
                    onClick={handleSave}
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
