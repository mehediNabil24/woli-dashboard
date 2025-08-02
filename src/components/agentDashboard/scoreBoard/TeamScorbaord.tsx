"use client"

import { Table,  Select, Pagination } from "antd"
// import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import { useGetTeamScoreboardQuery } from "../../../redux/features/team/teamApi"

const { Option } = Select

interface TeamRecord {
  key: string
  position: number
  teamName: string
  builderName: string
  totalAnnualPremium: number
  totalIncome: number
}

export default function ScoreBoard() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [month, setMonth] = useState<number | undefined>(undefined)
  const [sortBy, setSortBy] = useState<string | undefined>(undefined)

  // ✅ Fetch from API
  const { data, isLoading } = useGetTeamScoreboardQuery({
    sortBy,
    month,
    page,
    limit,
  })
  console.log("Team Scoreboard Data:", data)

  const teamData: TeamRecord[] =
    data?.data?.data.map((item: any) => ({
      key: item.teamId,
      position: item.position,
      teamName: item.teamName,
      builderName: item.builderName,
      totalAnnualPremium: item.totalAnnualPremium,
      totalIncome: item.totalIncome,
    })) || []

  const columns: ColumnsType<TeamRecord> = [
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
    { title: "Team Name", dataIndex: "teamName", key: "teamName" },
    { title: "Builder Name", dataIndex: "builderName", key: "builderName" },
    {
      title: "Total Annual Premium",
      dataIndex: "totalAnnualPremium",
      key: "totalAnnualPremium",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Total Income",
      dataIndex: "totalIncome",
      key: "totalIncome",
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
            onChange={(val) => setMonth(val)}
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
            onChange={(val) => setSortBy(val)}
            allowClear
          >
            <Option value="sales">Sales</Option>
            <Option value="chargeback">Chargeback</Option>
            <Option value="income">Income</Option>
            
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={teamData}
            loading={isLoading}
            pagination={false}
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {((page - 1) * limit) + 1}-
            {Math.min(page * limit, data?.data?.meta?.total || 0)} of{" "}
            {data?.data?.meta?.total || 0}
          </div>
          <Pagination
            current={page}
            total={data?.data?.meta?.total || 0}
            pageSize={limit}
            showSizeChanger={false}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  )
}
