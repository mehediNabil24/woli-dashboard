/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Button,
  message
} from "antd";
import {
  EditOutlined,
  StarFilled,

} from "@ant-design/icons";
import UpdateProfileModal from "./AgentModal";
import {
  useGetGetProfileQuery,
  useUpdateProfileMutation
} from "../../../redux/features/profile/profileApi";
import ImageUploader from "./UploaderImage";
import { toast } from "sonner";
import Change_Password from "./Change_Password";
import DocumentAdd from "./DocunentAdd";
interface ProfileData {
  name: { first: string; last: string };
  email: string;
  phone: string;
  dob: string;
  gender: string;
  homeAddress: string;
  city: string;
  state: string;
  zip: string;
}

export default function ProfilePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isLoading, refetch } = useGetGetProfileQuery({});
  const userData = data?.data || {};
  const [updateProfile] = useUpdateProfileMutation();

  const [profileInfo, setProfileInfo] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (userData?.profile) {
      setProfileInfo({
        name: {
          first: userData.profile.firstName || "",
          last: userData.profile.lastName || ""
        },
        email: userData.email || "",
        phone: userData.profile.phone || "",
        dob: userData.profile.dateOfBirth || "",
        gender: userData.profile.gender || "",
        homeAddress: userData.profile.homeAddress || "",
        city: userData.profile.city || "",
        state: userData.profile.state || "",
        zip: userData.profile.zipCode || ""
      });
    }
  }, [userData]);

  const handleEditClick = () => setIsModalVisible(true);
  const handleModalCancel = () => setIsModalVisible(false);

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
      zip: updatedData.address.zip
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
        avatar: updatedData.avatar
      };

      const res = await updateProfile(payload).unwrap();
      if (res?.success) {
        toast.success(res.message);
        refetch();
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error("Update failed:", err);
      message.error("Failed to update profile.");
      toast.error(err?.data?.message);
    }
  };





  if (isLoading || !profileInfo) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="flex justify-center items-start">
      <div className="bg-white rounded-lg p-4 w-full max-w-8xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Left: Image & Rank */}
          <div className="lg:col-span-1 flex flex-col items-center text-center">
            <ImageUploader userData={userData} />
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <StarFilled key={i} className="text-gray-300 text-xl" />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Rank (Level 1)
            </h3>
            <p className="text-gray-600 text-sm max-w-xs">
              You're in train level one. Keep working to earn more stars.
            </p>
          </div>

          {/* Right: Account Info */}
          <div className="lg:col-span-3 pl-8 border-l border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Account Info</h2>
              <Button
                type="link"
                onClick={handleEditClick}
                className="p-0 h-auto"
              >
                <EditOutlined className="text-gray-600 text-lg" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                {
                  label: "Name",
                  value: `${profileInfo.name.first} ${profileInfo.name.last}`
                },
                { label: "Phone Number", value: profileInfo.phone },
                { label: "Email", value: profileInfo.email },
                { label: "Date of birth", value: profileInfo.dob },
                { label: "Gender", value: profileInfo.gender },
                { label: "Home", value: profileInfo.homeAddress },
                { label: "City", value: profileInfo.city },
                { label: "State", value: profileInfo.state },
                { label: "Zip", value: profileInfo.zip }
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item.label}
                  </label>
                  <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Change Password */}
        <Change_Password />

        {/* E&O/ License Doc */}
        <DocumentAdd documentAgent={userData?.userDocuments}/>
     <div>
      
     </div>

      </div>

      {/* Profile Edit Modal */}
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
            zip: profileInfo.zip
          }
        }}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}
