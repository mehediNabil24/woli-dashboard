/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Input, Button, Upload, message } from "antd"
import { EditOutlined, StarFilled, DeleteOutlined, PaperClipOutlined, SendOutlined } from "@ant-design/icons"
import type { UploadFile, UploadProps } from "antd/es/upload/interface"
import UpdateProfileModal from "./AgentModal"
import { useGetGetProfileQuery, useUpdateProfileMutation } from "../../../redux/features/profile/profileApi"
import ImageUploader from "./UploaderImage"
import { toast } from "sonner"

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

  const { data, isLoading,refetch } = useGetGetProfileQuery({})
  const userData = data?.data || {};

  console.log(userData, "data");
  const [profileInfo, setProfileInfo] = useState<ProfileData>({
    name: { first: userData?.profile?.firstName, last: userData?.profile?.lastName },
    email: userData?.email,
    phone: userData?.profile?.phone,
    dob: userData?.profile?.dateOfBirth,
    gender: userData?.profile?.gender,
    homeAddress: userData?.profile?.homeAddress,
    city: userData?.profile?.city,
    state: userData?.profile?.state,
    zip: userData?.profile?.zipCode,
  })

  const handleEditClick = () => setIsModalVisible(true)
  const handleModalCancel = () => setIsModalVisible(false)
  const [updateProfile] = useUpdateProfileMutation();

  const handleProfileUpdate = async (updatedData: any) => {
    setProfileInfo({
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.contact,
      dob: updatedData.dob,
      gender: updatedData.gender,
      homeAddress: updatedData.address.street,
      city: updatedData.address.city,
      state: updatedData.address.state,
      zip: updatedData.address.zip,
    });

    try {
      const payload = {
        firstName: updatedData.name.first,
        lastName: updatedData.name.last,
        email: updatedData.email,
        phone: updatedData.contact,
        dateOfBirth: updatedData.dob,
        gender: updatedData.gender,
        homeAddress: updatedData.address.street,
        city: updatedData.address.city,
        state: updatedData.address.state,
        zipCode: updatedData.address.zip,
        avatar: updatedData.avatar,
      };

      const res = await updateProfile(payload).unwrap();
      if(res?.success){
        toast.success(res.message)
        refetch()
      }else{
        toast.error(res.message)
      }
    } catch (err: any) {
      console.error("Update failed:", err);
      message.error("Failed to update profile.");
      
    }
  };


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
      return false
    },
    fileList,
    showUploadList: false,
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className=" flex justify-center items-start">
      <div className="bg-white rounded-lg  p-4 w-full max-w-8xl">
        {/* Top Section: Profile Summary and Account Info (in one row, two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Left Column: Profile Summary */}

          <div className="lg:col-span-1 flex flex-col items-center text-center">
            <ImageUploader userData={userData}/>
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
          contact: profileInfo.phone, 
          dob: profileInfo.dob,
          gender: profileInfo.gender,
          address: {
            street: profileInfo.homeAddress, 
            state: profileInfo.state,
            city: profileInfo.city,
            zip: profileInfo.zip,
          },
        }}
        onUpdate={handleProfileUpdate}
      />

    
    </div>
  )
}
