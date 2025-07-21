"use client"

import { useState } from "react"
import { Table, Input, Pagination, Dropdown, Menu, Avatar, Select } from "antd"
import { SearchOutlined, MoreOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import AgentDetailsPage from "./AgentDeatils"

const { Option } = Select

interface AgentRecord {
  key: string
  agentProfile: {
    name: string
    avatar: string
    flag: string
  }
  email: string
  contract: string
  dateOfBirth: string
  status: "Approved" | "Pending" | "Rejected"
  // Additional fields for AgentDetailsPage
  contactNumber: string
  level: string
  uploadedDocuments: { name: string; url: string }[]
}

const initialData: AgentRecord[] = [
  {
    key: "1",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "wilson.levin@example.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Approved",
    contactNumber: "+1 235469787",
    level: "Level 1 (Trainee)",
    uploadedDocuments: [
      { name: "Document 1.pdf", url: "#" },
      { name: "Contract.docx", url: "#" },
    ],
  },
  {
    key: "2",
    agentProfile: {
      name: "Nolan Botosh",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "nolanbotosh@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Pending",
    contactNumber: "+1 987654321",
    level: "Level 2 (Live Transfer Agent)",
    uploadedDocuments: [{ name: "License.pdf", url: "#" }],
  },
  {
    key: "3",
    agentProfile: {
      name: "Zain Baptista",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "zainbaptista@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Rejected",
    contactNumber: "+1 112233445",
    level: "Level 3 (Closer Agent)",
    uploadedDocuments: [],
  },
  {
    key: "4",
    agentProfile: {
      name: "Kaylynn Lipshutz",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "kaylynnlipshutz@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Approved",
    contactNumber: "+1 556677889",
    level: "Level 4 (Team director)",
    uploadedDocuments: [{ name: "Certification.pdf", url: "#" }],
  },
  {
    key: "5",
    agentProfile: {
      name: "Roger Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "rogerlevin@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Pending",
    contactNumber: "+1 998877665",
    level: "Level 5 (Owner)",
    uploadedDocuments: [{ name: "Agreement.pdf", url: "#" }],
  },
  {
    key: "6",
    agentProfile: {
      name: "Emerson Culhane",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "emersonculhane@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Approved",
    contactNumber: "+1 123123123",
    level: "Level 1 (Trainee)",
    uploadedDocuments: [],
  },
  {
    key: "7",
    agentProfile: {
      name: "Justin Aminoff",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "justinaminoff@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Pending",
    contactNumber: "+1 456456456",
    level: "Level 2 (Live Transfer Agent)",
    uploadedDocuments: [{ name: "ID.pdf", url: "#" }],
  },
  {
    key: "8",
    agentProfile: {
      name: "Tiana Torff",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "tianatorff@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Approved",
    contactNumber: "+1 789789789",
    level: "Level 3 (Closer Agent)",
    uploadedDocuments: [{ name: "Resume.pdf", url: "#" }],
  },
  {
    key: "9",
    agentProfile: {
      name: "Marilyn Workman",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "marilynworkman@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Approved",
    contactNumber: "+1 321321321",
    level: "Level 4 (Team director)",
    uploadedDocuments: [],
  },
  {
    key: "10",
    agentProfile: {
      name: "Kaylynn Lubin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    email: "kaylynnlubin@email.com",
    contract: "+0123456789",
    dateOfBirth: "06 - 07 - 2025",
    status: "Rejected",
    contactNumber: "+1 654654654",
    level: "Level 5 (Owner)",
    uploadedDocuments: [{ name: "Portfolio.pdf", url: "#" }],
  },
]

export default function AgentListPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentRecord | null>(null)

  const handleDetailsClick = (record: AgentRecord) => {
    setSelectedAgent(record)
  }

  const handleBackToAgentList = () => {
    setSelectedAgent(null)
  }

  const columns: ColumnsType<AgentRecord> = [
    {
      title: "Agent Profile",
      dataIndex: "agentProfile",
      key: "agentProfile",
      className: "text-gray-700 font-medium",
      render: (profile: { name: string; avatar: string; flag: string }) => (
        <div className="flex items-center space-x-2">
          <Avatar src={profile.avatar} size="large" />
          <img src={profile.flag || "/placeholder.svg"} alt="Flag" width={16} height={16} />
          <span>{profile.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Contract",
      dataIndex: "contract",
      key: "contract",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "text-gray-700 font-medium",
      render: (status: "Approved" | "Pending" | "Rejected") => (
        <div
          className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-sm font-medium ${
            status === "Approved"
              ? "bg-green-100 text-green-800"
              : status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      className: "text-gray-700 font-medium",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="details" onClick={() => handleDetailsClick(record)}>
                Details
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <MoreOutlined className="text-lg cursor-pointer" />
        </Dropdown>
      ),
    },
  ]

  if (selectedAgent) {
    return (
      <AgentDetailsPage
        agent={{
          name: selectedAgent.agentProfile.name,
          avatar: selectedAgent.agentProfile.avatar,
          email: selectedAgent.email,
        //   contract: selectedAgent.contract,
          dateOfBirth: selectedAgent.dateOfBirth,
          status: selectedAgent.status,
          contactNumber: selectedAgent.contactNumber,
          level: selectedAgent.level,
          uploadedDocuments: selectedAgent.uploadedDocuments,
        }}
        onBack={handleBackToAgentList}
      />
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-end p-4 space-x-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-md border-gray-300 w-64 focus:border-yellow-400 focus:ring-yellow-400"
            size="middle"
          />
          <Select defaultValue="status" style={{ width: 120 }} size="middle">
            <Option value="status">Status</Option>
            <Option value="Approved">Approved</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={initialData} // Using initialData directly for simplicity, can be filtered
            pagination={false}
            className="agent-list-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-white")}
          />
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">Showing 1-10 of 187</div>

          <Pagination
            current={1}
            total={187}
            pageSize={10}
            showSizeChanger={false}
            className="agent-list-pagination"
            itemRender={(page, type, originalElement) => {
              if (type === "page") {
                return (
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium border ${
                      page === 1
                        ? "bg-yellow-400 border-yellow-400 text-black"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              }
              return originalElement
            }}
          />
        </div>
      </div>

      <style>{`
        .agent-list-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .agent-list-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .agent-list-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .agent-list-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .agent-list-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .agent-list-pagination .ant-pagination-prev button,
        .agent-list-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .agent-list-pagination .ant-pagination-prev button:hover,
        .agent-list-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
        .ant-input-affix-wrapper-focused {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
        .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
      `}</style>
    </div>
  )
}
