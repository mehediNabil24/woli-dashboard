import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateProfileMutation } from "../../../redux/features/profile/profileApi";

export default function ImageUploader({userData}: any) {
  const [image, setImage] = useState<string | null>(null);
  const [updateProfile] = useUpdateProfileMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(uploadedFile);

      // Auto upload
      const formData = new FormData();
      formData.append("image", uploadedFile); // must match backend field

      try {
        const res = await updateProfile(formData).unwrap();
        console.log("Upload successful:", res);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="relative mb-4 w-80 h-80">
      <img
        src={userData?.profile?.imageUrl || "/default-avatar.png"}
        alt="Uploaded"
        className="w-80 h-80 object-cover rounded-lg"
      />

      <div className="absolute top-0 right-0 bg-white  p-1 shadow cursor-pointer">
        <label htmlFor="imageUpload">
          <EditOutlined className="text-gray-600 text-sm  cursor-pointer" />
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
