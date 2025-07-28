import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateProfileMutation } from "@/redux/api/userApi"; // Adjust this path

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [updateProfile] = useUpdateProfileMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile); // for sending to server

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // for preview
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // 'image' field name must match backend

    try {
      const res = await updateProfile(formData).unwrap();
      console.log("Success:", res);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="relative mb-4 w-80 h-80">
      <img
        src={image || "/default-avatar.png"}
        alt="Uploaded"
        className="w-80 h-80 object-cover rounded-lg"
      />

      <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
        <label htmlFor="imageUpload">
          <EditOutlined className="text-gray-600 text-sm" />
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload Image
      </button>
    </div>
  );
}
