"use client"


import { Avatar, Input, Pagination, Select, Table } from "antd"
import { SearchOutlined, CheckCircleFilled } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react" // Import useState

const { Option } = Select

interface AgentInfo {
  name: string
  avatar: string
  contactNumber: string
  dateOfBirth: string
  email: string
  rank: string
  status: string
  isVerified: boolean
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
  status: "Paid" | "Toward" | "Chargeback Paid" // Added status for row coloring
}

interface SalesDetailsPageProps {
  agentInfo: AgentInfo
  transactions: SalesTransactionRecord[]
  onBack: () => void
}

export default function SalesDetailsPage({ agentInfo, transactions, onBack }: SalesDetailsPageProps) {
  const [transactionData, setTransactionData] = useState<SalesTransactionRecord[]>(transactions) // Make data stateful

  const handleTransactionStatusChange = (key: string, newStatus: SalesTransactionRecord["status"]) => {
    setTransactionData((prevData) =>
      prevData.map((record) => (record.key === key ? { ...record, status: newStatus } : record)),
    )
  }

  const salesTransactionColumns: ColumnsType<SalesTransactionRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Client's Name",
      dataIndex: "clientName",
      key: "clientName",
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
      title: "Commission Paid to Agent",
      dataIndex: "commissionPaidToAgent",
      key: "commissionPaidToAgent",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Date & Time Commission Paid",
      dataIndex: "dateTimeCommissionPaid",
      key: "dateTimeCommissionPaid",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Closer",
      dataIndex: "closer",
      key: "closer",
      className: "text-gray-700 font-medium",
      render: (text: string) => (
        <div className="inline-flex items-center justify-center px-3 py-1 bg-black text-white rounded-md text-sm font-medium">
          {text}
        </div>
      ),
    },
    {
      title: "Agent's Notes",
      dataIndex: "status", // Changed dataIndex to status
      key: "agentNotes",
      className: "text-gray-700 font-medium",
      render: (status: SalesTransactionRecord["status"], record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleTransactionStatusChange(record.key, value)}
          className={`w-full agent-notes-select`}
        >
          <Option value="Chargeback Paid">Chargeback Unpaid</Option>
          <Option value="Toward">Paid Towards</Option>
          <Option value="Paid">Paid</Option>
        </Select>
      ),
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
       
        <button onClick={onBack} className="text-blue-600 hover:underline">
          &larr; Back to Sales List
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Agent Info Card */}
        <div className="border border-yellow-300 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center space-x-4 md:col-span-1">
            <Avatar size={80} src={agentInfo.avatar} />
            <div>
              <div className="text-sm text-gray-600">Name</div>
              <div className="text-lg font-semibold text-gray-800">{agentInfo.name}</div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mb-2">
              <div className="text-sm text-gray-600">Contact number</div>
              <div className="font-semibold text-gray-800">{agentInfo.contactNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Date of birth</div>
              <div className="font-semibold text-gray-800">{agentInfo.dateOfBirth}</div>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col items-start md:items-end">
            <div className="mb-2">
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-semibold text-gray-800">{agentInfo.email}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">Rank</div>
              <div className="font-semibold text-gray-800">{agentInfo.rank}</div>
              {agentInfo.isVerified && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <CheckCircleFilled className="mr-1 text-blue-500" /> Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 mb-4">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-md border-blue-400 focus:border-blue-400 focus:ring-blue-400"
              size="middle"
            />
          </div>
          <Select defaultValue="status" style={{ width: 120 }} size="middle">
            <Option value="status">Status</Option>
            <Option value="Paid">Paid</Option>
            <Option value="Toward">Toward</Option>
            <Option value="Chargeback Paid">Chargeback Paid</Option>
          </Select>
        </div>

        {/* Sales Transactions Table */}
        <div className="overflow-x-auto">
          <Table
            columns={salesTransactionColumns}
            dataSource={transactionData} // Use stateful data
            pagination={false}
            className="sales-details-table"
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
            className="sales-details-pagination"
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
        .sales-details-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .sales-details-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .sales-details-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .sales-details-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .sales-details-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .sales-details-pagination .ant-pagination-prev button,
        .sales-details-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .sales-details-pagination .ant-pagination-prev button:hover,
        .sales-details-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
        .ant-input-affix-wrapper-focused {
          border-color: #3b82f6 !important; /* Blue for search input focus */
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }
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
