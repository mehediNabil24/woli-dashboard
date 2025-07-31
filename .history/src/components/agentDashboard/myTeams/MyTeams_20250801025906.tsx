"use client"

import { Table, Input, Select, Pagination, Avatar } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import img1 from '../../../assets/Rectangle 41.png'

const { Option } = Select

interface AgentRecord {
    key: string
    rank: string
    agentProfile: {
        name: string
        avatar: string
        flag: string
    }
    month: string
    totalExpenses: string
    totalChargebacks: string
    totalSales: string
    totalNet: string
}

const data: AgentRecord[] = Array.from({ length: 5 }, (_, index) => ({
    key: `${index + 1}`,
    agentProfile: {
        name: "Wilson Levin",
        avatar: img1,
        flag: img1,
    },

    totalSales: "$1234",
    totalNet: "$1234",
}))

export default function MyTeams() {
    const columns: ColumnsType<AgentRecord> = [

        {
            title: "Agent Profile",
            dataIndex: "agentProfile",
            key: "agentProfile",
            className: "text-gray-700 font-medium",
            render: (profile: { name: string; avatar: string; flag: string }) => (
                <div className="flex items-center space-x-2">
                    <Avatar src={profile.avatar} size="large" />
                    {/* Using standard <img> tag for flags */}
                    <img src={profile.flag || "/placeholder.svg"} alt="Flag" width={16} height={16} />
                    <span>{profile.name}</span>
                </div>
            ),
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

    return (
        <div className=" min-h-screen">
            <div className="bg-white rounded-lg shadow-sm">
                {/* Header Section */}
                <div className="flex items-center justify-end p-4 space-x-4">
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
                    </Select>
                    <Select defaultValue="sales" style={{ width: 160 }} size="middle">
                        <Option value="sales">Rank by Sales</Option>
                        <Option value="chargeback">Rank by Chargeback</Option>
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
                                        className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium border ${page === 1
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

        /* Custom styling for Total Chargebacks column */
        .agent-ranking-table .ant-table-thead .ant-table-cell.chargeback-column-style {
          background-color: #ef4444; /* Tailwind red-500 */
          color: white;
          font-weight: 600;
          text-align: center; /* Center header text */
        }

        .agent-ranking-table .ant-table-tbody .ant-table-cell.chargeback-column-style {
          background-color: #ef4444; /* Tailwind red-500 */
          color: white;
          padding: 0; /* Remove default padding to let inner div control it */
        }

        /* Style for the content inside the chargeback cells */
        .agent-ranking-table .ant-table-tbody .ant-table-cell.chargeback-column-style > div {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 12px 16px; /* Restore padding to inner content */
        }
      `}</style>
        </div>
    )
}
