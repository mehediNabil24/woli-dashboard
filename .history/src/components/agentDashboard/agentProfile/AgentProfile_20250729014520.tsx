/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {  Input, Button, Upload, message } from "antd"
import { EditOutlined, StarFilled, DeleteOutlined, PaperClipOutlined, SendOutlined } from "@ant-design/icons"

import image1 from "../../../assets/Rectangle 55.png"



import type { UploadFile, UploadProps } from "antd/es/upload/interface"
import UpdateProfileModal from "./AgentModal"
import { useGetGetProfileQuery } from "../../../redux/features/profile/profileApi"

interface ProfileData {
  name: { first: string; last: string }
  email: string
  phone: string
  dob: string
  gender: string
  homeAddress: string
  city: string
  state: string
  zip: string
}

export default function ProfilePage() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {data, isLoading} = useGetGetProfileQuery({})
  const userData = data?.data || {};

  console.log(userData, "data");
  const [profileInfo, setProfileInfo] = useState<ProfileData>({
    name: { first: userData?.profile?.firstName, last: userData?.profile?.firstName },
    email: userData?.,
    phone: "+12 1514 2154",
    dob: "12 April, 1998",
    gender: "Female",
    homeAddress: "12 JM Town",
    city: "Dhaka",
    state: "Dhaka",
    zip: "1422",
  })

  const handleEditClick = () => setIsModalVisible(true)
  const handleModalCancel = () => setIsModalVisible(false)
  const handleProfileUpdate = (updatedData: any) => {
    setProfileInfo({
      ...profileInfo,
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.contact, // mapping 'contact' from modal to 'phone'
      dob: updatedData.dob,
      gender: updatedData.gender,
      homeAddress: updatedData.address.street,
      city: updatedData.address.city,
      state: updatedData.address.state,
      zip: updatedData.address.zip,
    })
  }

  const [fileList, setFileList] = useState<UploadFile[]>([
    { uid: "1", name: "denialcertificate.png", status: "done", url: "#" },
    { uid: "2", name: "license2023.pdf", status: "done", url: "#" },
  ])

  const handleFileRemove = (file: UploadFile) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid))
  }

  const uploadProps: UploadProps = {
    onRemove: handleFileRemove,
    beforeUpload: (file) => {
      setFileList((prev) => [...prev, file])
      message.success(`${file.name} file uploaded successfully.`)
      return false // Prevent default upload
    },
    fileList,
    showUploadList: false,
  }

  return (
    <div className=" flex justify-center items-start">
      <div className="bg-white rounded-lg  p-4 w-full max-w-8xl">
        {/* Top Section: Profile Summary and Account Info (in one row, two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Left Column: Profile Summary */}
          <div className="lg:col-span-1 flex flex-col items-center text-center">
            <div className="relative mb-4">
             <img src={image1} alt="" className="w-80 h-80  " />
              <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow">
                <EditOutlined className="text-gray-600 text-sm" />
              </div>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <StarFilled key={i} className="text-gray-300 text-xl" />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Rank (Level 1)</h3>
            <p className="text-gray-600 text-sm max-w-xs">
              You're in train level one. Keep working to earn more stars.
            </p>
          </div>

          {/* Right Column: Account Info */}
          <div className="lg:col-span-3 pl-8 border-l border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Account Info</h2>
              <Button type="link" onClick={handleEditClick} className="p-0 h-auto">
                <EditOutlined className="text-gray-600 text-lg" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "Name", value: `${profileInfo.name.first} ${profileInfo.name.last}` },
                { label: "Phone Number", value: profileInfo.phone },
                { label: "Email", value: profileInfo.email },
                { label: "Date of birth", value: profileInfo.dob },
                { label: "Gender", value: profileInfo.gender },
                { label: "Home", value: profileInfo.homeAddress },
                { label: "City", value: profileInfo.city },
                { label: "State", value: profileInfo.state },
                { label: "Zip", value: profileInfo.zip },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Change Password Section (Full Width) */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
          <div className="grid grid-cols-1 gap-y-4">
            {["Current", "New", "Confirm"].map((label, i) => (
              <div className="mb-4" key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label} Password</label>
                <Input.Password placeholder={`${label} Password`} size="large" className="custom-input" />
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
            >
              Save Now
            </Button>
            <Button
              type="default"
              className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300 rounded-md px-6 py-2 h-auto font-semibold"
            >
              Not Now
            </Button>
          </div>
        </div>

        {/* E&O/ License Doc Section (Full Width) */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">E&O/ License Doc</h2>
          <div className="space-y-2 mb-4">
            {fileList.map((file) => (
              <div key={file.uid} className="flex items-center justify-between text-gray-700">
                <span>
                  Attached:{" "}
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {file.name}
                  </a>
                </span>
                <Button
                  type="text"
                  icon={<DeleteOutlined className="text-red-500" />}
                  onClick={() => handleFileRemove(file)}
                />
              </div>
            ))}
          </div>
          <Upload {...uploadProps}>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200">
              <PaperClipOutlined className="text-gray-600" />
              <span className="text-gray-700">Attach a File</span>
              <SendOutlined className="text-gray-600 ml-auto" />
            </div>
          </Upload>
        </div>
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        initialData={{
          name: profileInfo.name,
          state: profileInfo.state,
          email: profileInfo.email,
          contact: profileInfo.phone, // mapping 'phone' to 'contact'
          dob: profileInfo.dob,
          gender: profileInfo.gender,
          address: {
            street: profileInfo.homeAddress, // assuming homeAddress is a string
            state: profileInfo.state,
            city: profileInfo.city,
            zip: profileInfo.zip,
          },
        }}
        onUpdate={handleProfileUpdate}
      />

      <style>{`
        .custom-input .ant-input,
        .custom-input .ant-input-affix-wrapper,
        .custom-input .ant-input-password {
          background-color: #f0f0f0 !important; /* Light gray background */
          border-color: #f0f0f0 !important; /* Match border to background */
          border-radius: 4px;
          padding: 10px 12px;
        }
        .custom-input .ant-input:hover,
        .custom-input .ant-input-affix-wrapper:hover,
        .custom-input .ant-input-password:hover {
          border-color: #d9d9d9 !important; /* Slightly darker gray on hover */
        }
        .custom-input .ant-input:focus,
        .custom-input .ant-input-affix-wrapper-focused,
        .custom-input .ant-input-password:focus {
          border-color: #d9d9d9 !important; /* Keep border consistent on focus */
          box-shadow: none !important; /* Remove default Ant Design blue shadow */
        }
      `}</style>
    </div>
  )
}
