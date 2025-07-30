/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { Modal, Input, Radio, Button } from "antd"
import { useState } from "react"
import "./UpdateProfileModal.css" // Import external CSS

interface UpdateProfileModalProps {
  visible: boolean
  onCancel: () => void
  initialData?: {
    name: { first: string; last: string }
    state: string
    email: string
    contact: string
    dob: string
    gender: string
    avatar?: string
    address: { street: string; state: string; city: string; zip: string }
  }
  onUpdate: (data: any) => void
}

export default function UpdateProfileModal({ visible, onCancel, initialData, onUpdate }: UpdateProfileModalProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: { first: "Emily", last: "Cater" },
      state: "California",
      email: "xyz@gmail.com",
      contact: "+15 41512",
      dob: "12/12/1998",
      gender: "Female",
      avatar: "", // Added avatar field
      address: { street: "e.g dhaka", state: "State", city: "City", zip: "Zip" },
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith("name.")) {
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, [name.split(".")[1]]: value },
      }))
    } else if (name.startsWith("address.")) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name.split(".")[1]]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleGenderChange = (e: any) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    onUpdate(formData)
    console.log(formData, "formData");
    onCancel()
  }

  return (
    <Modal
      title={
        <div className="text-center text-2xl font-bold uppercase pb-2 border-b-2 border-black inline-block">
          UPDATE PROFILE INFO
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
      destroyOnClose
      className="update-profile-modal"
    >
      <div className="p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Profile Image Upload */}
          <div className="col-span-full flex justify-center items-center flex-col gap-2">
           <label
  htmlFor="avatar-upload"
  className="relative w-28 h-28 rounded-full overflow-hidden shadow-md border border-gray-300 cursor-pointer block"
>
  <img
    src={formData.avatar || "/default-avatar.png"}
    alt="Avatar Preview"
    className="object-cover w-full h-full"
  />
  <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-tr-lg">
    Edit
  </div>
  <input
    id="avatar-upload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleImageUpload}
  />
</label>


          </div>

          {/* Name */}
          <div>
            <label htmlFor="name-first" className="block text-sm font-bold text-gray-800 mb-1">
              Name
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="name-first"
                name="name.first"
                placeholder="e.g Emily"
                size="large"
                className="custom-input"
                value={formData.name.first}
                onChange={handleChange}
              />
              <Input
                id="name-last"
                name="name.last"
                placeholder="e.g Cater"
                size="large"
                className="custom-input"
                value={formData.name.last}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-bold text-gray-800 mb-1">
              State*
            </label>
            <Input
              id="state"
              name="state"
              placeholder="e.g California"
              size="large"
              className="custom-input"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              placeholder="e.g Xyz@gmail.com"
              size="large"
              className="custom-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-bold text-gray-800 mb-1">
              Contact
            </label>
            <Input
              id="contact"
              name="contact"
              placeholder="e.g +15 41512"
              size="large"
              className="custom-input"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-bold text-gray-800 mb-1">
              Date of Birth
            </label>
            <Input
              id="dob"
              name="dob"
              placeholder="e.g 12/12/1998"
              size="large"
              className="custom-input"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-bold text-gray-800 mb-1">
              Gender
            </label>
            <Radio.Group onChange={handleGenderChange} value={formData.gender} className="flex items-center h-full">
              <Radio value="Female" className="text-gray-700">Female</Radio>
              <Radio value="Male" className="text-gray-700">Male</Radio>
            </Radio.Group>
          </div>

          {/* Home Address */}
          <div className="col-span-full">
            <label htmlFor="address-street" className="block text-sm font-bold text-gray-800 mb-1">
              Home Address
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Input
                id="address-street"
                name="address.street"
                placeholder="e.g dhaka"
                size="large"
                className="custom-input col-span-full sm:col-span-1"
                value={formData.address.street}
                onChange={handleChange}
              />
              <Input
                id="address-state"
                name="address.state"
                placeholder="State"
                size="large"
                className="custom-input"
                value={formData.address.state}
                onChange={handleChange}
              />
              <Input
                id="address-city"
                name="address.city"
                placeholder="City"
                size="large"
                className="custom-input"
                value={formData.address.city}
                onChange={handleChange}
              />
              <Input
                id="address-zip"
                name="address.zip"
                placeholder="Zip"
                size="large"
                className="custom-input"
                value={formData.address.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full flex justify-center mt-6">
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 30px",
                fontSize: "18px",
                fontWeight: 600,
                height: "auto",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#333"
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "black"
              }}
            >
              Update Now
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
