"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, Input, Button, message } from "antd"

export default function AdminProfile() {
  const [adminInfo, setAdminInfo] = useState({
    name: "Henry Jr.",
    email: "zain.aminoff@email.com",
    phoneNumber: "",
    address: "",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const handleAdminInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdminInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveAdminChanges = () => {
    // Implement save logic here
    message.success("Admin information saved!")
    console.log("Admin Info Saved:", adminInfo)
  }

  const handleUpdatePassword = () => {
    // Implement password update logic here
    if (passwordInfo.newPassword !== passwordInfo.confirmNewPassword) {
      message.error("New password and confirm password do not match.")
      return
    }
    message.success("Password updated successfully!")
    console.log("Password Updated:", passwordInfo)
    setPasswordInfo({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    })
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-3xl">
        {/* Header Section */}
        <div className="flex items-center space-x-6 mb-8">
          <Avatar size={80} src="/placeholder.svg?height=80&width=80" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Henry Jr.</h1>
            <p className="text-gray-600">zain.aminoff@email.com</p>
          </div>
        </div>

        {/* Dotted Line Separator */}
        <div className="w-full border-t-2 border-dashed border-blue-300 mb-8" />

        {/* Admin Information Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Information</h2>
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-1">
                Name*
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your first name"
                size="large"
                className="custom-input-border"
                value={adminInfo.name}
                onChange={handleAdminInfoChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-1">
                Email*
              </label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your name"
                size="large"
                className="custom-input-border"
                value={adminInfo.email}
                onChange={handleAdminInfoChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-800 mb-1">
                Phone number
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+0"
                size="large"
                className="custom-input-border"
                value={adminInfo.phoneNumber}
                onChange={handleAdminInfoChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-bold text-gray-800 mb-1">
                Address*
              </label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                size="large"
                className="custom-input-border"
                value={adminInfo.address}
                onChange={handleAdminInfoChange}
              />
            </div>
          </div>
          <div className="mt-8">
            <Button
              type="primary"
              onClick={handleSaveAdminChanges}
              className="bg-yellow-400 text-black hover:bg-yellow-500 border-none rounded-md px-8 py-2 h-auto text-lg font-semibold"
            >
              Save changes
            </Button>
          </div>
        </div>

        {/* Change Password Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-bold text-gray-800 mb-1">
                Current Password
              </label>
              <Input.Password
                id="currentPassword"
                name="currentPassword"
                size="large"
                className="custom-input-border"
                value={passwordInfo.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-bold text-gray-800 mb-1">
                New Password
              </label>
              <Input.Password
                id="newPassword"
                name="newPassword"
                size="large"
                className="custom-input-border"
                value={passwordInfo.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-bold text-gray-800 mb-1">
                Confirm new Password
              </label>
              <Input.Password
                id="confirmNewPassword"
                name="confirmNewPassword"
                size="large"
                className="custom-input-border"
                value={passwordInfo.confirmNewPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="mt-8">
            <Button
              type="primary"
              onClick={handleUpdatePassword}
              className="bg-yellow-400 text-black hover:bg-yellow-500 border-none rounded-md px-8 py-2 h-auto text-lg font-semibold"
            >
              Update password
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-input-border .ant-input,
        .custom-input-border .ant-input-affix-wrapper,
        .custom-input-border .ant-input-password {
          border-color: #d9d9d9 !important; /* Light gray border */
          border-radius: 4px;
          padding: 10px 12px;
        }
        .custom-input-border .ant-input:hover,
        .custom-input-border .ant-input-affix-wrapper:hover,
        .custom-input-border .ant-input-password:hover {
          border-color: #a0a0a0 !important; /* Darker gray on hover */
        }
        .custom-input-border .ant-input:focus,
        .custom-input-border .ant-input-affix-wrapper-focused,
        .custom-input-border .ant-input-password:focus {
          border-color: #40a9ff !important; /* Ant Design default blue on focus */
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
      `}</style>
    </div>
  )
}
