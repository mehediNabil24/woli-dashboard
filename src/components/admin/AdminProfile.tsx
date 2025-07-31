"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, message, Modal, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import img1 from "../../assets/Rectangle 41.png";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useGetGetProfileQuery, useUpdateProfileMutation } from "../../redux/features/profile/profileApi";
import { toast } from "sonner";

export default function AdminProfilePage() {
  const { data: profileData, refetch } = useGetGetProfileQuery({});
  console.log("Profile Data:", profileData);
  const [updatePassword] = useChangePasswordMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    homeAddress: "",
    city: "",
    state: "",
    zipCode: "",
    streetAddress: "",
    image: "", 
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);

  // ✅ Load profile data from API response
  useEffect(() => {
    if (profileData?.data) {
      const user = profileData.data;
      console.log("User Data:", user);
      setAdminInfo({
        firstName: user?.profile?.firstName || "nabil",
        lastName: user?.profile?.lastName || "",
        email: user?.email || "",
        phone: user?.profile?.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
        homeAddress: user?.profile?.homeAddress || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        streetAddress: user.streetAddress || "",
        image: user?.profile?.imageUrl || "",
      });
    }
  }, [profileData]);

  const handleAdminInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save profile info
  const handleSaveAdminChanges = async () => {
    try {
      const payload = {
        firstName: adminInfo.firstName,
        lastName: adminInfo.lastName,
        phone: adminInfo.phone,
        dateOfBirth: adminInfo.dateOfBirth,
        gender: adminInfo.gender,
        homeAddress: adminInfo.homeAddress,
        city: adminInfo.city,
        state: adminInfo.state,
        zipCode: adminInfo.zipCode,
        streetAddress: adminInfo.streetAddress,
      };

      const response = await updateProfile(payload).unwrap();
      toast.success(response?.message || "Profile updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile!");
    }
  };

  // ✅ Change password
  const handleUpdatePassword = async () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    try {
      const payload = {
        oldPassword: passwordInfo.currentPassword,
        newPassword: passwordInfo.newPassword,
      };

      const response = await updatePassword(payload).unwrap();
      toast.success(response?.message || "Password updated successfully!");

      setPasswordInfo({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password!");
    }
  };

  const handleAvatarEdit = () => setIsAvatarModalVisible(true);

  const handleAvatarUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setAvatarFileList(fileList.slice(-1));
  };

  // ✅ Get image from DB or uploaded preview
  const getAvatarUrl = () => {
    if (avatarFileList.length > 0) {
      return avatarFileList[0].thumbUrl || avatarFileList[0].url;
    }
    return adminInfo.image || img1;
  };

  // ✅ Handle avatar upload
  const handleImageSave = async () => {
    if (!avatarFileList.length) {
      message.error("Please upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", avatarFileList[0].originFileObj as File);

      const res = await updateProfile(formData).unwrap();
      toast.success(res?.message || "Image updated successfully!");

      // Update UI without reload
      setAdminInfo((prev) => ({
        ...prev,
        image: res.data?.image || prev.image,
      }));

      setIsAvatarModalVisible(false);
      refetch();
    } catch (error) {
      toast.error("Failed to update image!");
    }
  };

  return (
    <div className="p-4 min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg p-8 w-full max-w-8xl">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={getAvatarUrl()}
              alt="Admin Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div
              className="absolute top-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer"
              onClick={handleAvatarEdit}
            >
              <EditOutlined className="text-gray-600 text-sm" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {adminInfo.firstName} {adminInfo.lastName}
            </h1>
            <p className="text-gray-500">{adminInfo.email}</p>
          </div>
        </div>

        <div className="w-full border-t-2 border-dashed border-blue-300 mb-8" />

        {/* Admin Info */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Information</h2>
          <div className="grid grid-cols-1 gap-y-6">
            {["firstName", "lastName", "phone", "homeAddress"].map((field, i) => (
              <div key={i}>
                <label className="block text-sm font-bold mb-1 capitalize">{field}</label>
                <Input
                  name={field}
                  value={(adminInfo as any)[field]}
                  onChange={handleAdminInfoChange}
                  size="large"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-bold mb-1">Email*</label>
              <Input value={adminInfo.email} disabled size="large" />
            </div>
          </div>
          <div className="mt-8">
            <Button type="primary" onClick={handleSaveAdminChanges} style={{ backgroundColor: "#FACC15", color: "#000" }}>
              Save changes
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
          <div className="grid grid-cols-1 gap-y-6">
            {["currentPassword", "newPassword", "confirmNewPassword"].map((field, i) => (
              <div key={i}>
                <label className="block text-sm font-bold mb-1 capitalize">{field}</label>
                <Input.Password
                  name={field}
                  value={(passwordInfo as any)[field]}
                  onChange={handlePasswordChange}
                  size="large"
                />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button type="primary" onClick={handleUpdatePassword} style={{ backgroundColor: "#FACC15", color: "#000" }}>
              Update password
            </Button>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      <Modal
        title="Edit Avatar"
        open={isAvatarModalVisible}
        onCancel={() => setIsAvatarModalVisible(false)}
        onOk={handleImageSave}
        okText="Save"
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          fileList={avatarFileList}
          onChange={handleAvatarUploadChange}
          beforeUpload={() => false}
        >
          {avatarFileList.length >= 1 ? null : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Modal>
    </div>
  );
}
