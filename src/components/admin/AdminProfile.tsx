"use client"

import React, { useState } from "react"
import { Input, Button, message, Modal, Upload } from "antd"
import { EditOutlined, UploadOutlined } from "@ant-design/icons"
import type { UploadFile } from "antd/es/upload/interface"
import img1 from "../../assets/Rectangle 41.png"

export default function AdminProfilePage() {
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

  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false)
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([])

  const handleAdminInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdminInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveAdminChanges = () => {
    message.success("Admin information saved!")
    console.log("Admin Info Saved:", adminInfo)
  }

  const handleUpdatePassword = () => {
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

  const handleAvatarEdit = () => {
    setIsAvatarModalVisible(true)
  }

  const handleAvatarUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setAvatarFileList(fileList.slice(-1)) // Only keep the latest uploaded file
  }

  const getAvatarUrl = () => {
    const file = avatarFileList[0]
    return file?.thumbUrl || file?.url || img1
  }

  return (
    <div className="p-4  min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg p-8 w-full max-w-8xl">
        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
          <div style={{ position: "relative" }}>
            <img
              src={getAvatarUrl()}
              alt="Admin Avatar"
              style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover",
              }}
            />
            <div
              style={{
          position: "absolute",
          top: 0,
          right: 0,
          background: "#fff",
          borderRadius: "50%",
          padding: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
              }}
              onClick={handleAvatarEdit}
            >
              <EditOutlined style={{ color: "#4B5563", fontSize: "14px" }} />
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 600, color: "#1F2937", margin: 0 }}>{adminInfo.name}</h1>
            <p style={{ color: "#4B5563", margin: 0 }}>{adminInfo.email}</p>
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
                placeholder="Enter your email"
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
              style={{
              backgroundColor: "#FACC15", // yellow-400
              color: "#000",
              border: "none",
              borderRadius: "6px",
              padding: "12px 32px",
              height: "auto",
              fontSize: "1.125rem",
              fontWeight: 600,
              transition: "background 0.2s",
              }}
              onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FDE047" // yellow-500
              }}
              onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FACC15"
              }}
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
              style={{
              backgroundColor: "#FACC15", // yellow-400
              color: "#000",
              border: "none",
              borderRadius: "6px",
              padding: "12px 32px",
              height: "auto",
              fontSize: "1.125rem",
              fontWeight: 600,
              transition: "background 0.2s",
              }}
              onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FDE047" // yellow-500
              }}
              onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FACC15"
              }}
            >
              Update password
            </Button>
          </div>
        </div>
      </div>

      {/* Avatar Edit Modal */}
      <Modal
        title="Edit Avatar"
        open={isAvatarModalVisible}
        onCancel={() => setIsAvatarModalVisible(false)}
        onOk={() => {
          message.success("Avatar updated successfully!")
          setIsAvatarModalVisible(false)
        }}
        okText="Save"
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          fileList={avatarFileList}
          onChange={handleAvatarUploadChange}
          beforeUpload={() => false} // Prevent auto upload
        >
          {avatarFileList.length >= 1 ? null : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Modal>

      <style>{`
        .custom-input-border .ant-input,
        .custom-input-border .ant-input-affix-wrapper,
        .custom-input-border .ant-input-password {
          border-color: #d9d9d9 !important;
          border-radius: 4px;
          padding: 10px 12px;
        }
        .custom-input-border .ant-input:hover,
        .custom-input-border .ant-input-affix-wrapper:hover,
        .custom-input-border .ant-input-password:hover {
          border-color: #a0a0a0 !important;
        }
        .custom-input-border .ant-input:focus,
        .custom-input-border .ant-input-affix-wrapper-focused,
        .custom-input-border .ant-input-password:focus {
          border-color: #40a9ff !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
      `}</style>
    </div>
  )
}
