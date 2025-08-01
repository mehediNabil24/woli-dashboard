"use client"

import { Table,  Select, Pagination } from "antd"
// import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useState, useEffect } from "react"
import { useGetAgentScoreboardQuery } from "../../../redux/features/team/teamApi"


const { Option } = Select

interface AgentRecord {
  key: string
  position: number
  name: string
  totalSales: number
  totalIncome: number
  totalChargeback: number
  netSales: number
}

export default function AgentScoreBoard() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [month, setMonth] = useState<number | undefined>(undefined)
  const [sortBy, setSortBy] = useState<string | undefined>(undefined)

  // ✅ Fetch leaderboard data
  const { data, isLoading } = useGetAgentScoreboardQuery({
    sortBy: sortBy || undefined,
    month: month || undefined,
    page,
    limit,
  })

  // ✅ Debug: See what params are being sent
  useEffect(() => {
    console.log("Fetching Agent Board:", {
      sortBy,
      month,
      page,
      limit,
    })
  }, [sortBy, month, page, limit])

  // ✅ Map API data safely
  const agentData: AgentRecord[] =
    data?.data?.data.map((item: any) => ({
      key: item.id,
      position: item.position,
      name: item.name,
      totalSales: item.totalSales,
      totalIncome: item.totalIncome,
      totalChargeback: item.totalChargeback,
      netSales: item.netSales,
    })) || []

  const totalItems = data?.data?.meta?.total || 0

  const columns: ColumnsType<AgentRecord> = [
    {
      title: "Rank",
      dataIndex: "position",
      key: "position",
      render: (text: number) => (
        <div className="inline-flex items-center justify-center w-10 h-7 bg-[#FFFAE8] rounded-md text-black font-semibold text-sm">
          {text}
        </div>
      ),
    },
    { title: "Agent Name", dataIndex: "name", key: "name" },
    {
      title: "Total Sales",
      dataIndex: "totalSales",
      key: "totalSales",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Total Income",
      dataIndex: "totalIncome",
      key: "totalIncome",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Total Chargebacks",
      dataIndex: "totalChargeback",
      key: "totalChargeback",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Total NET",
      dataIndex: "netSales",
      key: "netSales",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters */}
        <div className="flex items-center justify-end p-4 space-x-4">
          {/* <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-md border-gray-300 w-44 focus:border-yellow-400 focus:ring-yellow-400"
            size="middle"
          /> */}
          <Select
            placeholder="Select Month"
            style={{ width: 120 }}
            size="middle"
            onChange={(val) => {
              setMonth(val)
              setPage(1) // reset to first page
            }}
            allowClear
          >
            {[...Array(12)].map((_, i) => (
              <Option key={i + 1} value={i + 1}>
                {i + 1}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Sort By"
            style={{ width: 160 }}
            size="middle"
            onChange={(val) => {
              setSortBy(val)
              setPage(1)
            }}
            allowClear
          >
            <Option value="sales">Rank by Sales</Option>
            <Option value="chargeback">Rank by Chargeback</Option>
            <Option value="income">Rank by Income</Option>
            
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={agentData}
            loading={isLoading}
            pagination={false}
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {agentData.length > 0 ? (page - 1) * limit + 1 : 0}-
            {Math.min(page * limit, totalItems)} of {totalItems}
          </div>
          <Pagination
            current={page}
            total={totalItems}
            pageSize={limit}
            showSizeChanger={false}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  )
}
