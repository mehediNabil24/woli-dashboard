"use client"

import { Avatar, Select, Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

import { useState } from "react" // Use destructuring to import only what's needed

const { Option } = Select

interface AgentDetails {
  name: string
  avatar: string
  contactNumber: string
  dateOfBirth: string
  email: string
  status: string
  level: string
  uploadedDocuments: { name: string; url: string }[]
}

interface AgentDetailsPageProps {
  agent: AgentDetails;
  onBack: () => void;
}

export default function AgentDetailsPage({ agent, onBack }: AgentDetailsPageProps) {
  const [currentStatus, setCurrentStatus] = useState(agent.status)
  const [currentLevel, setCurrentLevel] = useState(agent.level)

  const handleStatusChange = (value: string) => {
    setCurrentStatus(value)
    // In a real app, you'd send this update to your backend
    console.log(`Agent ${agent.name} status updated to: ${value}`)
  }

  const handleLevelChange = (value: string) => {
    setCurrentLevel(value)
    // In a real app, you'd send this update to your backend
    console.log(`Agent ${agent.name} level updated to: ${value}`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        &larr; Back to Agent List
      </button>
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Agent Info Card */}
        <div className="border border-yellow-300 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center space-x-4 md:col-span-1">
            <Avatar size={80} src={agent.avatar} />
            <div>
              <div className="text-sm text-gray-600">Name</div>
              <div className="text-lg font-semibold text-gray-800">{agent.name}</div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mb-2">
              <div className="text-sm text-gray-600">Contact number</div>
              <div className="font-semibold text-gray-800">{agent.contactNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Date of birth</div>
              <div className="font-semibold text-gray-800">{agent.dateOfBirth}</div>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col items-start md:items-end">
            <div className="mb-2">
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-semibold text-gray-800">{agent.email}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">Status</div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {agent.status}
              </span>
            </div>
          </div>
        </div>

        {/* Status and Agent Level Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Status</h3>
            <Select
              defaultValue={currentStatus}
              onChange={handleStatusChange}
              className="w-full custom-select-yellow"
              size="large"
            >
              <Option value="Approved">Approved</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Agent Level</h3>
            <Select
              defaultValue={currentLevel}
              onChange={handleLevelChange}
              className="w-full custom-select-yellow"
              size="large"
            >
              <Option value="Level 1 (Trainee)">Level 1 (Trainee)</Option>
              <Option value="Level 2 (Live Transfer Agent)">Level 2 (Live Transfer Agent)</Option>
              <Option value="Level 3 (Closer Agent)">Level 3 (Closer Agent)</Option>
              <Option value="Level 4 (Team director)">Level 4 (Team director)</Option>
              <Option value="Level 5 (Owner)">Level 5 (Owner)</Option>
              <Option value="Special Level (Custom)">Special Level (Custom)</Option>
            </Select>
          </div>
        </div>

        {/* Uploaded Documents Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Uploaded Documents</h3>
          <div className="space-y-4">
            {agent.uploadedDocuments.map(
              (doc: { name: string; url: string }, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 rounded-md p-4">
                  <span className="text-gray-700">{doc.name}</span>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    className="bg-yellow-400 text-black hover:bg-yellow-500 border-none rounded-md px-4 py-2 h-auto font-semibold"
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-select-yellow .ant-select-selector {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
        .custom-select-yellow .ant-select-arrow {
          color: #fbbf24 !important;
        }
      `}</style>
    </div>
  )
}
