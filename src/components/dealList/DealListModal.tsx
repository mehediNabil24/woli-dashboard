"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Modal, Input, Button } from "antd"

interface EditDealListModalProps {
  visible: boolean
  onCancel: () => void
  initialData?: {
    company: string
    product: string
    commissions: string
    chargeback: string
    applicationNumber: string
  }
  onSave: (data: any) => void
}

export default function EditDealListModal({ visible, onCancel, initialData, onSave }: EditDealListModalProps) {
  const [formData, setFormData] = useState<NonNullable<EditDealListModalProps['initialData']>>({
  company: "",
  product: "",
  commissions: "",
  chargeback: "",
  applicationNumber: "",
})


 useEffect(() => {
  if (initialData) {
    setFormData(initialData)
  }
}, [initialData])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSave(formData)
    onCancel()
  }

  return (
    <Modal
      title={null} // No title as per image
      open={visible}
      onCancel={onCancel}
      footer={null} // Hide default footer buttons
      width={450} // Adjust width as needed
      centered
      destroyOnClose // Destroy modal content on close to reset form
      className="edit-deal-list-modal"
    >
      <div className="p-6">
        <form className="grid grid-cols-1 gap-y-6">
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-600 mb-1">
              Company
            </label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="custom-input-underline"
              bordered={false} // Remove default border
            />
          </div>

          {/* Product */}
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-600 mb-1">
              Product
            </label>
            <Input
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="custom-input-underline"
              bordered={false}
            />
          </div>

          {/* Commissions % and Chargeback */}
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <label htmlFor="commissions" className="block text-sm font-medium text-green-600 mb-1">
                Commissions %
              </label>
              <Input
                id="commissions"
                name="commissions"
                value={formData.commissions}
                onChange={handleChange}
                className="custom-input-underline text-green-600"
                bordered={false}
              />
            </div>
            <div>
              <label htmlFor="chargeback" className="block text-sm font-medium text-red-600 mb-1">
                Chargeback
              </label>
              <Input
                id="chargeback"
                name="chargeback"
                value={formData.chargeback}
                onChange={handleChange}
                className="custom-input-underline text-red-600"
                bordered={false}
              />
            </div>
          </div>

          {/* Application Number */}
          <div>
            <label htmlFor="applicationNumber" className="block text-sm font-medium text-gray-600 mb-1">
              Application Number
            </label>
            <Input
              id="applicationNumber"
              name="applicationNumber"
              value={formData.applicationNumber}
              onChange={handleChange}
              className="custom-input-underline"
              bordered={false}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <Button
              type="primary"
              onClick={handleSubmit}
              className="bg-black text-white hover:bg-gray-800 border-none rounded-md px-10 py-2 h-auto text-lg font-semibold w-full"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
      <style>{`
        .edit-deal-list-modal .ant-modal-content {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .edit-deal-list-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }
        .edit-deal-list-modal .custom-input-underline.ant-input-borderless {
          border-bottom: 1px solid #d9d9d9; /* Light gray underline */
          padding-left: 0;
          padding-right: 0;
          box-shadow: none !important;
        }
        .edit-deal-list-modal .custom-input-underline.ant-input-borderless:hover {
          border-bottom-color: #a0a0a0; /* Darker gray on hover */
        }
        .edit-deal-list-modal .custom-input-underline.ant-input-borderless:focus {
          border-bottom-color: #000; /* Black on focus */
        }
        .edit-deal-list-modal .custom-input-underline.ant-input-borderless.text-green-600 {
          color: #22c55e !important;
        }
        .edit-deal-list-modal .custom-input-underline.ant-input-borderless.text-red-600 {
          color: #ef4444 !important;
        }
      `}</style>
    </Modal>
  )
}
