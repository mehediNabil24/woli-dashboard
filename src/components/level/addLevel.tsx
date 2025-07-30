"use client"


import { useState } from "react"
import { Input, Button, message } from "antd"
import { useAddLevelMutation } from "../../redux/features/level/levelApi"
import { toast } from "sonner"


export default function AddLevelForm() {
  const [levelOrder, setLevelOrder] = useState("")
  const [levelName, setLevelName] = useState("")
  const [percentage, setPercentage] = useState("")

  const [addLevel, { isLoading }] = useAddLevelMutation()

  const handleAddLevel = async () => {
    if (!levelOrder.trim() || !levelName.trim() || !percentage.trim()) {
      message.error("Please fill in all fields: Level Order, Level Name, and Percentage.")
      return
    }

    try {
      const payload = {
        levelOrder: Number(levelOrder),
        levelName: levelName.trim(),
        percentage: Number(percentage),
      }

      const res = await addLevel(payload).unwrap()

      if (res?.success) {
        toast.success(res?.message || `Level "${levelName}" added successfully!`)
        setLevelOrder("")
        setLevelName("")
        setPercentage("")
      } else {
        toast.error(res?.message || "Failed to add level")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  }

  const handleViewAllLevels = () => {
    message.info("Navigating to view all levels...")
    console.log("View all levels clicked")
  }

  return (
    <div className="p-8 bg-white min-h-screen flex justify-center items-start">
      <div className="w-full max-w-8xl">
        <div className="space-y-6">
          {/* Level Order Field */}
          <div>
            <label htmlFor="levelOrder" className="block text-sm font-medium text-gray-900 mb-2">
              Level Order
            </label>
            <Input
              id="levelOrder"
              placeholder="e.g 3"
              size="large"
              type="number"
              className="custom-input"
              value={levelOrder}
              onChange={(e) => setLevelOrder(e.target.value)}
            />
          </div>

          {/* Level Name Field */}
          <div>
            <label htmlFor="levelName" className="block text-sm font-medium text-gray-900 mb-2">
              Level Name
            </label>
            <Input
              id="levelName"
              placeholder="e.g Closer Agent"
              size="large"
              className="custom-input"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
            />
          </div>

          {/* Percentage Field */}
          <div>
            <label htmlFor="percentage" className="block text-sm font-medium text-gray-900 mb-2">
              Percentage
            </label>
            <Input
              id="percentage"
              placeholder="e.g 7"
              size="large"
              type="number"
              className="custom-input"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button
              type="primary"
              loading={isLoading}
              onClick={handleAddLevel}
              className="add-level-btn"
            >
              Add Level
            </Button>
            <Button
              type="default"
              onClick={handleViewAllLevels}
              className="view-all-levels-btn"
            >
              View All Levels
            </Button>
            <style>{`
              .add-level-btn {
                background-color: #000 !important;
                color: #fff !important;
                border: none !important;
                border-radius: 6px !important;
                padding: 12px 32px !important;
                height: auto !important;
                font-size: 16px !important;
                font-weight: 500 !important;
                flex: 1 1 0%;
                transition: background 0.2s;
              }
              .add-level-btn:hover {
                background-color: #1f2937 !important;
              }
              .view-all-levels-btn {
                background-color: #fff !important;
                color: #374151 !important;
                border: 1px solid #d1d5db !important;
                border-radius: 6px !important;
                padding: 12px 32px !important;
                height: auto !important;
                font-size: 16px !important;
                font-weight: 500 !important;
                flex: 1 1 0%;
                transition: background 0.2s;
              }
              .view-all-levels-btn:hover {
                background-color: #f9fafb !important;
              }
            `}</style>
          </div>
        </div>
      </div>

      <style>{`
        .custom-input .ant-input {
          border: none !important;
          border-bottom: 1px solid #d1d5db !important;
          border-radius: 0 !important;
          padding: 8px 0 !important;
          box-shadow: none !important;
          background-color: transparent !important;
        }
        .custom-input .ant-input:hover {
          border-bottom-color: #9ca3af !important;
        }
        .custom-input .ant-input:focus {
          border-bottom-color: #374151 !important;
          box-shadow: none !important;
        }
        .custom-input .ant-input::placeholder {
          color: #9ca3af !important;
          font-weight: normal !important;
        }
      `}</style>
    </div>
  )
}
