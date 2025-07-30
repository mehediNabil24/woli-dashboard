/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Modal, Input, Select, Button } from "antd"
import { useEffect, useState } from "react"
import { useUpdateDealsMutation } from "../../../redux/features/deals/dealsApi"
import { toast } from "sonner"

const { TextArea } = Input

interface EditDealModalProps {
  visible: boolean
  onCancel: () => void
  initialData?: {
    key: string
    state: string
    company: string
    product: string
    clientFirstName: string
    clientLastName: string
    applicationNumber: string
    annualPremium: string
    note: string
  }
}

export default function EditDealModal({ visible, onCancel, initialData }: EditDealModalProps) {
  const [formData, setFormData] = useState({
    state: "",
    company: "",
    product: "",
    clientFirstName: "",
    clientLastName: "",
    applicationNumber: "",
    annualPremium: "",
    note: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        state: initialData.state || "",
        company: initialData.company || "",
        product: initialData.product || "",
        clientFirstName: initialData.clientFirstName || "",
        clientLastName: initialData.clientLastName || "",
        applicationNumber: initialData.applicationNumber || "",
        annualPremium: initialData.annualPremium || "",
        note: initialData.note || "",
      })
    }
  }, [initialData])

  const [updateDeal, { isLoading }] = useUpdateDealsMutation(initialData?.key)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData);
return
    if (!initialData?.key) {
      toast.error("No deal selected for update")
      return
    }

    try {
      const res = await updateDeal({
        id: initialData.key,
        updateData: formData
      }).unwrap()

      if (res?.success) {
        toast.success(res?.message || "Deal updated successfully")
        onCancel() // modal close
      } else {
        toast.error(res?.message || "Update failed")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  }

  return (
    <Modal
      title={
        <div className="text-center text-2xl font-bold uppercase pb-2 border-b-2 border-black inline-block">
          EDIT DEALS
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
      destroyOnClose
      className="edit-deal-modal"
    >
      <div className="p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* State */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">State*</label>
            <Select
              value={formData.state}
              onChange={(val) => handleChange("state", val)}
              className="w-full"
              size="large"
            >
              <Select.Option value="California">California</Select.Option>
              <Select.Option value="New York">New York</Select.Option>
            </Select>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Select Company*</label>
            <Select
              value={formData.company}
              onChange={(val) => handleChange("company", val)}
              className="w-full"
              size="large"
            >
              <Select.Option value="Xyz">Xyz</Select.Option>
              <Select.Option value="Abc">Abc</Select.Option>
            </Select>
          </div>

          {/* Product */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Product*</label>
            <Select
              value={formData.product}
              onChange={(val) => handleChange("product", val)}
              className="w-full"
              size="large"
            >
              <Select.Option value="Omaha">Omaha</Select.Option>
              <Select.Option value="Product B">Product B</Select.Option>
            </Select>
          </div>

          {/* Client Name */}
          <div className="col-span-full">
            <label className="block text-sm font-bold text-gray-800 mb-1">Client Name*</label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={formData.clientFirstName}
                onChange={(e) => handleChange("clientFirstName", e.target.value)}
                placeholder="First Name"
                size="large"
              />
              <Input
                value={formData.clientLastName}
                onChange={(e) => handleChange("clientLastName", e.target.value)}
                placeholder="Last Name"
                size="large"
              />
            </div>
          </div>

          {/* Application Number */}
          <div className="col-span-full">
            <label className="block text-sm font-bold text-gray-800 mb-1">Application Number*</label>
            <Input
              value={formData.applicationNumber}
              onChange={(e) => handleChange("applicationNumber", e.target.value)}
              size="large"
            />
          </div>

          {/* Annual Premium */}
          <div className="col-span-full">
            <label className="block text-sm font-bold text-gray-800 mb-1">Annual Premium*</label>
            <Input
              value={formData.annualPremium}
              onChange={(e) => handleChange("annualPremium", e.target.value)}
              size="large"
            />
          </div>

          {/* Note */}
          <div className="col-span-full">
            <label className="block text-sm font-bold text-gray-800 mb-1">Note*</label>
            <TextArea
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              rows={4}
              size="large"
            />
          </div>

          {/* Update Button */}
          <div className="col-span-full flex justify-center mt-6">
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "12px 40px",
                fontSize: "18px",
                fontWeight: 600,
                height: "auto",
              }}
              className="update-now-btn"
            >
              Update Now
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
