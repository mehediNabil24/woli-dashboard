"use client"

import { useState, useEffect } from "react"
import { Modal, Input, Button, message } from "antd"
import { useUpdateProductMutation } from "../../redux/features/product/productApi"
import { toast } from "sonner"

interface EditDealListModalProps {
  visible: boolean
  onCancel: () => void
  initialData?: {
    key: string // product ID
    company: string
    product: string
    commissions: string
    chargeback: string
    applicationNumber: string
  }
  onSave: (data: any) => void
}

export default function EditDealListModal({
  visible,
  onCancel,
  initialData,
  onSave,
}: EditDealListModalProps) {
  const [formData, setFormData] = useState<NonNullable<EditDealListModalProps["initialData"]>>({
    key: "",
    company: "",
    product: "",
    commissions: "",
    chargeback: "",
    applicationNumber: "",
  })

  const [updateProduct, { isLoading }] = useUpdateProductMutation()

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, product: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!formData.key) {
      message.error("Invalid product ID.")
      return
    }

    try {
      const res = await updateProduct({
        id: formData.key,
        body: { productName: formData.product.trim() }, // ✅ Send body correctly
      }).unwrap()

      if (res?.success) {
        toast.success("Product name updated successfully!")
        onSave(formData)
        onCancel()
      } else {
        message.error(res?.message || "Failed to update product name.")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed.")
    }
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
      className="edit-deal-list-modal"
      confirmLoading={isLoading}
    >
      <div className="p-6">
        <form
          className="grid grid-cols-1 gap-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          {/* Editable Product Name */}
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <Input
              id="product"
              name="product"
              value={formData.product}
              onChange={handleProductChange}
              className="custom-input-underline"
              bordered={false}
              autoFocus
            />
          </div>

          {/* Non-editable fields */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
            <Input value={formData.company} bordered={false} disabled />
          </div>

          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <label className="block text-sm font-medium text-green-600 mb-1">Commissions %</label>
              <Input value={formData.commissions} bordered={false} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Chargeback</label>
              <Input value={formData.chargeback} bordered={false} disabled />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Application Number</label>
            <Input value={formData.applicationNumber} bordered={false} disabled />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black text-white hover:bg-gray-800 border-none rounded-md px-10 py-2 h-auto text-lg font-semibold w-full"
              loading={isLoading}
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
          border-bottom: 1px solid #d9d9d9;
          padding-left: 0;
          padding-right: 0;
          box-shadow: none !important;
        }
        .edit-deal-list-modal .custom-input-underline.ant-input-borderless:hover {
          border-bottom-color: #a0a0a0;
        }
        .edit-deal-list-modal .custom-input-underline.ant-input-borderless:focus {
          border-bottom-color: #000;
        }
      `}</style>
    </Modal>
  )
}
