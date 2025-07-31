"use client"
import { Table, Input, Pagination, Avatar } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import img1 from '../../../assets/Rectangle 41.png'

import "./team_report.css"
interface AgentRecord {
  key: string
  agentProfile: {
    name: string
    avatar: string
    flag: string
  }
  levels: string
  expenses: string
  sale: string
  annualPrime: string
  income: string
 
}

const data: AgentRecord[] = Array.from({ length: 5 }, (_, index) => ({
  key: `${index + 1}`,
  agentProfile: {
    name: "Wilson Levin",
    avatar: img1, 
    flag: img1,  
  },
   levels: "Agent(Level 1)",
  expenses: "$1234",
  annualPrime: "$1234", // Changed to match image
  sale: "$1234",
  income: "$1234",
}))

export default function TeamReport() {

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
      title: "Levels",
      dataIndex: "levels",
      key: "levels",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Expenses",
      dataIndex: "expenses",
      key: "expenses",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Annual Prime",
      dataIndex: "annualPrime",
      key: "annualPrime",
      // Apply class for header and cell styling
      className: "text-gray-700 font-medium",
      
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
      className: "text-gray-700 font-medium",
    },
  ]

  return (
    <div className="min-h-screen">
       <div className="bg-white rounded-lg shadow-sm">
                {/* Header Section */}
                <div className="flex items-center justify-end p-4 space-x-4">
                    <Input
                        placeholder="Search..."
                        prefix={<SearchOutlined className="text-gray-400" />}
                       className="rounded-md !border-gray-300 lg:!w-75 focus:!border-yellow-400 focus:!ring-yellow-400 !py-3"
                        size="middle"
                    />
                   
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
                        // total={187}
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

      
    </div>
  )
}
