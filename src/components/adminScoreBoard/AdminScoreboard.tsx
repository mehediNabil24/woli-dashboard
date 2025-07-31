"use client"

import { useState } from "react"
import { Table, Input, Select, Pagination, Avatar, Dropdown, Menu } from "antd"
import { SearchOutlined, MoreOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import img1 from '../../assets/Rectangle 55.png';
import img2 from '../../assets/fi_555526.png';


const { Option } = Select

interface AgentRecord {
  key: string
  rank: string
  agentProfile: {
    name: string
    avatar: string
    flag: string
  }
  totalNetPerformer: string // Changed from totalExpenses
  totalSales: string // Changed from totalChargeback
  // Add details for the details page
  contactNumber: string
  dateOfBirth: string
  email: string
  isVerified: boolean
  uploadedDocuments: { name: string; url: string }[]
}

const data: AgentRecord[] = [
  {
    key: "1",
    rank: "1",
    agentProfile: {
      name: "Wilson Levin",
        avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    isVerified: true,
    uploadedDocuments: [],
  },
  {
    key: "2",
    rank: "2",
    agentProfile: {
      name: "Nolan Botosh",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 987654321",
    dateOfBirth: "15 - 03 - 1990",
    email: "nolan.botosh@example.com",
    isVerified: false,
    uploadedDocuments: [],
  },
  {
    key: "3",
    rank: "3",
    agentProfile: {
      name: "Zain Baptista",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 112233445",
    dateOfBirth: "01 - 07 - 1985",
    email: "zain.baptista@example.com",
    isVerified: true,
    uploadedDocuments: [],
  },
  {
    key: "4",
    rank: "4",
    agentProfile: {
      name: "Kaylynn Lipshutz",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 556677889",
    dateOfBirth: "10 - 11 - 1992",
    email: "kaylynn.lipshutz@example.com",
    isVerified: false,
    uploadedDocuments: [],
  },
  {
    key: "5",
    rank: "5",
    agentProfile: {
      name: "Roger Levin",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 998877665",
    dateOfBirth: "05 - 02 - 1988",
    email: "roger.levin@example.com",
    isVerified: true,
    uploadedDocuments: [],
  },
  {
    key: "6",
    rank: "6",
    agentProfile: {
      name: "Emerson Culhane",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 123123123",
    dateOfBirth: "20 - 04 - 1993",
    email: "emerson.culhane@example.com",
    isVerified: false,
    uploadedDocuments: [],
  },
  {
    key: "7",
    rank: "7",
    agentProfile: {
      name: "Justin Aminoff",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 456456456",
    dateOfBirth: "08 - 09 - 1987",
    email: "justin.aminoff@example.com",
    isVerified: true,
    uploadedDocuments: [],
  },
  {
    key: "8",
    rank: "8",
    agentProfile: {
      name: "Tiana Torff",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 789789789",
    dateOfBirth: "14 - 06 - 1991",
    email: "tiana.torff@example.com",
    isVerified: false,
    uploadedDocuments: [],
  },
  {
    key: "9",
    rank: "9",
    agentProfile: {
      name: "Marilyn Workman",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 321321321",
    dateOfBirth: "29 - 10 - 1989",
    email: "marilyn.workman@example.com",
    isVerified: true,
    uploadedDocuments: [],
  },
  {
    key: "10",
    rank: "10",
    agentProfile: {
      name: "Kaylynn Lubin",
       avatar: img1,
      flag: img2,
    },
    totalNetPerformer: "$1234",
    totalSales: "$1234",
    contactNumber: "+1 654654654",
    dateOfBirth: "03 - 01 - 1994",
    email: "kaylynn.lubin@example.com",
    isVerified: false,
    uploadedDocuments: [],
  },
]

export default function ScoreBoard() {
  const [selectedAgent, setSelectedAgent] = useState<AgentRecord | null>(null)

  const handleDetailsClick = (record: AgentRecord) => {
    setSelectedAgent(record)
  }

  // const handleBackToScoreboard = () => {
  //   setSelectedAgent(null)
  // }

  const columns: ColumnsType<AgentRecord> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      className: "text-gray-700 font-medium",
      render: (text: string) => (
        <div className="inline-flex items-center justify-center w-10 h-7 bg-[#FFFAE8] rounded-md text-black font-semibold text-sm">
          {text}
        </div>
      ),
    },
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
      title: "Top Net Performer",
      dataIndex: "totalNetPerformer",
      key: "totalNetPerformer",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Top Sales",
      dataIndex: "totalSales",
      key: "totalSales",
      className: "text-gray-700 font-medium",
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
    // return (
    //   <AgentDetailsPage
    //     agent={{
    //       name: selectedAgent.agentProfile.name,
    //       avatar: selectedAgent.agentProfile.avatar,
    //       contactNumber: selectedAgent.contactNumber,
    //       dateOfBirth: selectedAgent.dateOfBirth,
    //       email: selectedAgent.email,
    //       level: selectedAgent.rank, // Pass rank to details page
    //       uploadedDocuments: selectedAgent.uploadedDocuments,
    //       status: selectedAgent.isVerified ? "Verified" : "Unverified",
    //     //   isVerified: selectedAgent.isVerified,
    //     }}
    //     onBack={handleBackToScoreboard}
    //   />
    // )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-end p-4 space-x-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-md border-gray-300 w-44 focus:border-yellow-400 focus:ring-yellow-400"
            size="middle"
          />
          <Select defaultValue="performer" style={{ width: 120 }} size="middle">
            <Option value="performer">Performer</Option>
            <Option value="top-net">Top NET</Option>
            <Option value="top-sales">Top Sales</Option>
          </Select>
          <Select defaultValue="month" style={{ width: 120 }} size="middle">
            <Option value="month">Month</Option>
            <Option value="week4">Week 4</Option>
            <Option value="ytd">YTD</Option>
          </Select>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="agent-ranking-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
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
            className="agent-ranking-pagination"
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
        .agent-ranking-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .agent-ranking-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .agent-ranking-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .agent-ranking-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .agent-ranking-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .agent-ranking-pagination .ant-pagination-prev button,
        .agent-ranking-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .agent-ranking-pagination .ant-pagination-prev button:hover,
        .agent-ranking-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
        .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
      `}</style>
    </div>
  )
}
