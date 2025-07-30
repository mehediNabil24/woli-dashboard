"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Modal, Input, message } from "antd"
import { useUpdateLevelMutation } from "../../redux/features/level/levelApi"
import { toast } from "sonner"


interface RankFormData {
  key?: string
  levelName: string
  levelOrder: number
  percentage: number
}

interface EditRankModalProps {
  visible: boolean
  onCancel: () => void
  initialData?: RankFormData
  onSave: (data: RankFormData) => void
}

export default function EditRankModal({
  visible,
  onCancel,
  initialData,
  onSave,
}: EditRankModalProps) {
  const [formData, setFormData] = useState<RankFormData>({
    levelName: "",
    levelOrder: 0,
    percentage: 0,
  })

  const [updateLevel, { isLoading }] = useUpdateLevelMutation()

  useEffect(() => {
    if (initialData) {
      setFormData({
        key: initialData.key,
        levelName: initialData.levelName || "",
        levelOrder: initialData.levelOrder || 0,
        percentage: initialData.percentage || 0,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.levelName || !formData.levelOrder || !formData.percentage) {
      message.warning("Please fill all fields")
      return
    }

    try {
      const res = await updateLevel({
        id: formData.key,
        body: {
          levelName: formData.levelName,
          levelOrder: Number(formData.levelOrder),
          percentage: Number(formData.percentage),
        },
      }).unwrap()

      // Show backend success message if available
      if (res?.message) {
        toast.success(res.message)
      } else {
        message.success("Level updated successfully")
      }
      onSave(formData)
      onCancel()
    } catch (error: any) {
      // Show backend error message if available
      const errMsg = error?.data?.message || "Failed to update level"
      toast.error(errMsg)
    }
  }


  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
      destroyOnClose
      className="edit-rank-modal"
    >
      <div className="p-6">
        <form className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Level Name */}
          <div>
            <label htmlFor="levelName" className="block text-sm font-medium text-gray-600 mb-1">
              Level Name
            </label>
            <Input
              id="levelName"
              name="levelName"
              value={formData.levelName}
              onChange={handleChange}
              className="custom-input-underline"
              bordered={false}
            />
          </div>

          {/* Level Order */}
          <div>
            <label htmlFor="levelOrder" className="block text-sm font-medium text-gray-600 mb-1">
              Level Order
            </label>
            <Input
              id="levelOrder"
              name="levelOrder"
              value={formData.levelOrder}
              onChange={handleChange}
              className="custom-input-underline"
              bordered={false}
            />
          </div>

          {/* Percentage */}
          <div>
            <label htmlFor="percentage" className="block text-sm font-medium text-gray-600 mb-1">
              Percentage
            </label>
            <Input
              id="percentage"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className="custom-input-underline"
              bordered={false}
            />
          </div>

          {/* Save Button */}
          <div className="col-span-full flex justify-center mt-6">
            <style>{`
                .custom-save-btn {
                    background-color: #000;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    padding: 12px 40px;
                    font-size: 1.125rem;
                    font-weight: 600;
                    width: 100%;
                    transition: background 0.2s;
                    cursor: pointer;
                }
                .custom-save-btn:hover {
                    background-color: #333;
                }
            `}</style>
            <button
              type="button"
              onClick={handleSubmit}
              className="custom-save-btn"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .edit-rank-modal .ant-modal-content {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .edit-rank-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }
        .edit-rank-modal .custom-input-underline.ant-input-borderless {
          border-bottom: 1px solid #d9d9d9;
          padding-left: 0;
          padding-right: 0;
          box-shadow: none !important;
        }
        .edit-rank-modal .custom-input-underline.ant-input-borderless:hover {
          border-bottom-color: #a0a0a0;
        }
        .edit-rank-modal .custom-input-underline.ant-input-borderless:focus {
          border-bottom-color: #000;
        }
      `}</style>
    </Modal>
  )
}
