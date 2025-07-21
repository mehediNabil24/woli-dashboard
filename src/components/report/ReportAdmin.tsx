"use client"

import { Table, Input, Select, Pagination } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

const { Option } = Select

interface ReportRecord {
  key: string
  agentProfile: {
    name: string
    level: string
  }
  totalGross: string
  totalExpense: string
  chargeback: string
  newExpense: string
  newNetAfterExpense: string
  commissions: string
}

const data: ReportRecord[] = [
  {
    key: "1",
    agentProfile: {
      name: "Tiana Torff",
      level: "Level 01(Traine)",
    },
    totalGross: "$2,124",
    totalExpense: "$2,124",
    chargeback: "$1234",
    newExpense: "$2,124",
    newNetAfterExpense: "$$2,124",
    commissions: "$1234",
  },
  {
    key: "2",
    agentProfile: {
      name: "Diana",
      level: "Level 05(Owner)",
    },
    totalGross: "$2,124",
    totalExpense: "$2,124",
    chargeback: "$1234",
    newExpense: "$2,124",
    newNetAfterExpense: "$$2,124",
    commissions: "$1234",
  },
  {
    key: "3",
    agentProfile: {
      name: "Judeis",
      level: "Special (Custom)",
    },
    totalGross: "$2,124",
    totalExpense: "$2,124",
    chargeback: "$1234",
    newExpense: "$2,124",
    newNetAfterExpense: "$$2,124",
    commissions: "$1234",
  },
]

export default function ReportAdmin() {
  const columns: ColumnsType<ReportRecord> = [
    {
      title: "Agent Profile",
      dataIndex: "agentProfile",
      key: "agentProfile",
      className: "text-gray-700 font-medium",
      render: (profile: { name: string; level: string }) => (
        <div>
          <div className="font-semibold text-gray-800">{profile.name}</div>
          <div className="text-sm text-gray-500">{profile.level}</div>
        </div>
      ),
    },
    {
      title: "Total Gross",
      dataIndex: "totalGross",
      key: "totalGross",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Total Expense",
      dataIndex: "totalExpense",
      key: "totalExpense",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Chargeback",
      dataIndex: "chargeback",
      key: "chargeback",
      className: "text-gray-700 font-medium",
    },
    {
      title: "New Expense",
      dataIndex: "newExpense",
      key: "newExpense",
      className: "text-gray-700 font-medium",
    },
    {
      title: "New Net After Expense",
      dataIndex: "newNetAfterExpense",
      key: "newNetAfterExpense",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Commissions",
      dataIndex: "commissions",
      key: "commissions",
      className: "text-gray-700 font-medium",
    },
  ]

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
          <Select defaultValue="week1" style={{ width: 120 }} size="middle">
            <Option value="week1">Week 1</Option>
            <Option value="week2">Week 2</Option>
            <Option value="week3">Week 3</Option>
            <Option value="week4">Week 4</Option>
          </Select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="report-table"
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
            className="report-pagination"
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
        .report-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .report-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .report-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .report-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .report-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .report-pagination .ant-pagination-prev button,
        .report-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .report-pagination .ant-pagination-prev button:hover,
        .report-pagination .ant-pagination-next button:hover {
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
