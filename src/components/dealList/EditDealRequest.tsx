"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Modal, Input, Button, Avatar } from "antd"
import { StarFilled } from "@ant-design/icons"

interface AgentProfile {
  name: string
  avatar: string
  rank: string
  rating: number
}

interface FormData {
  company: string
  product: string
  annualPremium: string
  chargeback: string
  agentProfile: AgentProfile
}

interface EditDealRequestModalProps {
  visible: boolean
  onCancel: () => void
  initialData?: FormData
  onSave: (data: FormData) => void
}

export default function EditDealRequestModal({
  visible,
  onCancel,
  initialData,
  onSave,
}: EditDealRequestModalProps) {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    product: "",
    annualPremium: "",
    chargeback: "",
    agentProfile: {
      name: "",
      avatar: "",
      rank: "",
      rating: 0,
    },
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
      title={null}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={450}
      centered
      destroyOnClose
      className="edit-deal-request-modal"
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
              bordered={false}
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

          {/* Annual Premium and Chargeback */}
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <label htmlFor="annualPremium" className="block text-sm font-medium text-gray-600 mb-1">
                Annum Premium
              </label>
              <Input
                id="annualPremium"
                name="annualPremium"
                value={formData.annualPremium}
                onChange={handleChange}
                className="custom-input-underline"
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

          {/* Agent Profile */}
          <div className="mt-4 flex items-center space-x-3">
            <Avatar
              size={48}
              src={formData.agentProfile?.avatar || "/placeholder.svg?height=48&width=48"}
            />
            <div>
              <div className="font-semibold text-gray-800">{formData.agentProfile?.name}</div>
              <div className="flex items-center text-sm text-gray-600">
                {[...Array(formData.agentProfile?.rating || 0)].map((_, i) => (
                  <StarFilled key={i} className="text-yellow-400 text-xs" />
                ))}
                {[...Array(5 - (formData.agentProfile?.rating || 0))].map((_, i) => (
                  <StarFilled key={i} className="text-gray-300 text-xs" />
                ))}
                <span className="ml-1">({formData.agentProfile?.rank})</span>
              </div>
            </div>
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
        .edit-deal-request-modal .ant-modal-content {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .edit-deal-request-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }
        .edit-deal-request-modal .custom-input-underline.ant-input-borderless {
          border-bottom: 1px solid #d9d9d9;
          padding-left: 0;
          padding-right: 0;
          box-shadow: none !important;
        }
        .edit-deal-request-modal .custom-input-underline.ant-input-borderless:hover {
          border-bottom-color: #a0a0a0;
        }
        .edit-deal-request-modal .custom-input-underline.ant-input-borderless:focus {
          border-bottom-color: #000;
        }
        .edit-deal-request-modal .custom-input-underline.ant-input-borderless.text-red-600 {
          color: #ef4444 !important;
        }
      `}</style>
    </Modal>
  )
}
