"use client"

import { Avatar, Input, Select, Table } from "antd"
import { SearchOutlined, CheckCircleFilled } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

const { Option } = Select

interface AgentDetails {
  name: string
  avatar: string
  contactNumber: string
  dateOfBirth: string
  email: string
  rank: string
  isVerified: boolean
}

interface PerformanceRecord {
  key: string
  ytd: string
  totalExpenses: string
  totalChargeback: string
  totalSales: string
  totalNet: string
}

interface AgentDetailsPageProps {
  agent: AgentDetails // Data for the specific agent
  onBack: () => void // Callback to go back to the scoreboard
}

const performanceData: PerformanceRecord[] = [
  {
    key: "1",
    ytd: "Week 1: June 1 - June 7",
    totalExpenses: "$1234",
    totalChargeback: "$1234",
    totalSales: "$1234",
    totalNet: "$1234",
  },
  {
    key: "2",
    ytd: "Week 2: June 8 - June 14",
    totalExpenses: "$1234",
    totalChargeback: "$1234",
    totalSales: "$1234",
    totalNet: "$1234",
  },
  {
    key: "3",
    ytd: "Week 3: June 15 - June 21",
    totalExpenses: "$1234",
    totalChargeback: "$1234",
    totalSales: "$1234",
    totalNet: "$1234",
  },
  {
    key: "4",
    ytd: "Week 4: June 22 - June 28",
    totalExpenses: "$1234",
    totalChargeback: "$1234",
    totalSales: "$1234",
    totalNet: "$1234",
  },
  {
    key: "5",
    ytd: "EOM",
    totalExpenses: "$1234",
    totalChargeback: "$1234",
    totalSales: "$1234",
    totalNet: "$1234",
  },
]

const performanceColumns: ColumnsType<PerformanceRecord> = [
  {
    title: "YTD",
    dataIndex: "ytd",
    key: "ytd",
    className: "text-gray-700 font-medium",
  },
  {
    title: "Total Expenses",
    dataIndex: "totalExpenses",
    key: "totalExpenses",
    className: "text-gray-700 font-medium",
  },
  {
    title: "Total Chargeback",
    dataIndex: "totalChargeback",
    key: "totalChargeback",
    className: "text-gray-700 font-medium",
  },
  {
    title: "Total Sales",
    dataIndex: "totalSales",
    key: "totalSales",
    className: "text-gray-700 font-medium",
  },
  {
    title: "Total NET",
    dataIndex: "totalNet",
    key: "totalNet",
    className: "text-gray-700 font-medium",
  },
]

export default function AgentDetailsPage({ agent, onBack }: AgentDetailsPageProps) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        &larr; Back to Scoreboard
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
              <div className="text-sm text-gray-600">Rank</div>
              <div className="font-semibold text-gray-800">{agent.rank}</div>
              {agent.isVerified && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <CheckCircleFilled className="mr-1 text-blue-500" /> Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Performance Table Section */}
        <div className="flex items-center justify-end mb-4 space-x-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-md border-gray-300 w-44 focus:border-yellow-400 focus:ring-yellow-400"
            size="middle"
          />
          <Select defaultValue="month" style={{ width: 120 }} size="middle">
            <Option value="month">Month</Option>
            <Option value="january">January</Option>
            <Option value="february">February</Option>
            <Option value="march">March</Option>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={performanceColumns}
            dataSource={performanceData}
            pagination={false}
            className="performance-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
          />
        </div>
      </div>

      <style>{`
        .performance-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .performance-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .performance-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
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
