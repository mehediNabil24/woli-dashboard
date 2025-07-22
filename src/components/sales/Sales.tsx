"use client"

import { useState } from "react"
import { Table, Input, Pagination, Dropdown, Menu, Avatar } from "antd"
import { SearchOutlined, MoreOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import { Select } from "antd" // Import Select
import SalesDetailsPage from "./SalesDetails"
const { Option } = Select // Destructure Option

interface SalesRecord {
  key: string
  agentProfile: {
    name: string
    avatar: string
    flag: string
  }
  commissionPaidToAgent: string
  annualPremiumTotal: string
  chargeback: string
  agentNotes: string // This field will still exist but the column will control 'status'
  status: "Chargeback Paid" | "Paid" | "Toward" // Status for row coloring
  // Additional fields for SalesDetailsPage
  contactNumber: string
  dateOfBirth: string
  email: string
  rank: string
  isVerified: boolean
  transactions: SalesTransactionRecord[] // Array of transactions for the details page
}

interface SalesTransactionRecord {
  key: string
  date: string
  carrier: string
  clientName: string
  annualPremiumTotal: string
  chargeback: string
  commissionPaidToAgent: string
  dateTimeCommissionPaid: string
  closer: string
  agentNotes: string
  status: "Paid" | "Toward" | "Chargeback Paid"
}

const initialData: SalesRecord[] = [
  {
    key: "1",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Chargeback Paid...",
    status: "Chargeback Paid",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "1-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Chargeback Paid",
        status: "Chargeback Paid",
      },
      {
        key: "1-2",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Chargeback Paid",
        status: "Chargeback Paid",
      },
    ],
  },
  {
    key: "2",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Chargeback Paid...",
    status: "Chargeback Paid",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "2-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Chargeback Paid",
        status: "Chargeback Paid",
      },
    ],
  },
  {
    key: "3",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Chargeback Paid...",
    status: "Chargeback Paid",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "3-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Chargeback Paid",
        status: "Chargeback Paid",
      },
    ],
  },
  {
    key: "4",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Paid on 7/7/2025",
    status: "Paid",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "4-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Paid",
        status: "Paid",
      },
    ],
  },
  {
    key: "5",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Paid on 7/7/2025",
    status: "Paid",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "5-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Paid",
        status: "Paid",
      },
    ],
  },
  {
    key: "6",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Paid on 7/7/2025",
    status: "Paid",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "6-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Paid",
        status: "Paid",
      },
    ],
  },
  {
    key: "7",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Paid Towards",
    status: "Toward",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "7-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Toward",
        status: "Toward",
      },
    ],
  },
  {
    key: "8",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Paid Towards",
    status: "Toward",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "8-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Toward",
        status: "Toward",
      },
    ],
  },
  {
    key: "9",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Paid Towards",
    status: "Toward",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "9-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Toward",
        status: "Toward",
      },
    ],
  },
  {
    key: "10",
    agentProfile: {
      name: "Wilson Levin",
      avatar: "/placeholder.svg?height=32&width=32",
      flag: "/placeholder.svg?height=16&width=16",
    },
    commissionPaidToAgent: "$1234",
    annualPremiumTotal: "$1234",
    chargeback: "$1234",
    agentNotes: "Paid Towards",
    status: "Toward",
    contactNumber: "+1 235469787",
    dateOfBirth: "24 - 01 - 1995",
    email: "wilson.levin@example.com",
    rank: "01",
    isVerified: true,
    transactions: [
      {
        key: "10-1",
        date: "01-01-2025",
        carrier: "Mutual of Omaha",
        clientName: "Tiana Torff",
        annualPremiumTotal: "$1234",
        chargeback: "$1234",
        commissionPaidToAgent: "$1234",
        dateTimeCommissionPaid: "01-01-2025:8pm",
        closer: "Alex Milgram",
        agentNotes: "Toward",
        status: "Toward",
      },
    ],
  },
]

export default function SalesPage() {
  const [selectedSale, setSelectedSale] = useState<SalesRecord | null>(null)
  const [tableData, setTableData] = useState<SalesRecord[]>(initialData) // Make data stateful

  const handleDetailsClick = (record: SalesRecord) => {
    setSelectedSale(record)
  }

  const handleBackToSalesList = () => {
    setSelectedSale(null)
  }

  const handleStatusChange = (key: string, newStatus: SalesRecord["status"]) => {
    setTableData((prevData) =>
      prevData.map((record) => (record.key === key ? { ...record, status: newStatus } : record)),
    )
  }

  const columns: ColumnsType<SalesRecord> = [
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
      title: "Commission Paid to Agent",
      dataIndex: "commissionPaidToAgent",
      key: "commissionPaidToAgent",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Annual Premium Total",
      dataIndex: "annualPremiumTotal",
      key: "annualPremiumTotal",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Chargeback",
      dataIndex: "chargeback",
      key: "chargeback",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Agent's Notes",
      dataIndex: "status", // Changed dataIndex to status
      key: "agentNotes",
      className: "text-gray-700 font-medium",
      render: (status: SalesRecord["status"], record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.key, value)}
          className={`w-full agent-notes-select`}
        >
          <Option value="Chargeback Paid">Chargeback Unpaid</Option>
          <Option value="Toward">Paid Towards</Option>
          <Option value="Paid">Paid</Option>
        </Select>
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

  if (selectedSale) {
    return (
      <SalesDetailsPage
        agentInfo={{
          name: selectedSale.agentProfile.name,
          avatar: selectedSale.agentProfile.avatar,
          contactNumber: selectedSale.contactNumber,
          dateOfBirth: selectedSale.dateOfBirth,
          email: selectedSale.email,
          rank: selectedSale.rank,
          status: selectedSale.status,
          isVerified: selectedSale.isVerified,
        }}
        transactions={selectedSale.transactions}
        onBack={handleBackToSalesList}
      />
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-end p-4">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-md border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
              size="middle"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData} // Use stateful data
            pagination={false}
            className="sales-table"
            rowClassName={(record) => {
              if (record.status === "Chargeback Paid") {
                return "bg-red-100"
              } else if (record.status === "Toward") {
                return "bg-blue-100"
              } else if (record.status === "Paid") {
                return "bg-green-100"
              }
              return "bg-white"
            }}
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
            className="sales-pagination"
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
        .sales-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .sales-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .sales-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .sales-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .sales-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .sales-pagination .ant-pagination-prev button,
        .sales-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .sales-pagination .ant-pagination-prev button:hover,
        .sales-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
        .ant-input-affix-wrapper-focused {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
        /* Custom styles for status select */
        .agent-notes-select .ant-select-selector {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          height: auto !important;
        }
        .agent-notes-select .ant-select-selection-item {
          font-weight: 600;
        }
        .agent-notes-select .ant-select-selection-item[title="Chargeback Paid"] {
          color: #ef4444; /* Red */
        }
        .agent-notes-select .ant-select-selection-item[title="Paid"] {
          color: #22c55e; /* Green */
        }
        .agent-notes-select .ant-select-selection-item[title="Toward"] {
          color: #3b82f6; /* Blue */
        }
      `}</style>
    </div>
  )
}
