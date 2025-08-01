"use client"
import { Table, Input, Pagination, Avatar, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import "./myTeams.css"
import img1 from '../../../assets/Rectangle 41.png'
import { Plus } from "lucide-react"
import { useState } from "react"
import InviteTeamForm from "./Invite_Team"
import CreateTeamModal from "./CreateTeam"


interface AgentRecord {
  key: string
  agentProfile: {
    name: string
    avatar: string
    flag: string
  }
  levels: string
  action: string
}

const data: AgentRecord[] = Array.from({ length: 5 }, (_, index) => ({
  key: `${index + 1}`,
  agentProfile: {
    name: "Wilson Levin",
    avatar: img1,
    flag: img1,
  },
  levels: "Agent(Level 1)",
  action: "....",
}))

export default function MyTeams() {
  const [openModal, setOpenModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const columns: ColumnsType<AgentRecord> = [
    {
      title: "Agent Profile",
      dataIndex: "agentProfile",
      key: "agentProfile",
      className: "text-gray-700 font-medium",
      render: (profile) => (
        <div className="flex items-center space-x-2">
          <Avatar src={profile.avatar} size="large" />
          <img src={profile.flag || "/placeholder.svg"} alt="Flag" width={16} height={16} />
          <span>{profile.name}</span>
        </div>
      ),
    },
    { title: "Levels", dataIndex: "levels", key: "levels" },
    { title: "Action", dataIndex: "action", key: "action" },
  ]

  // const handleCreateTeam = (values: { teamName: string; teamCode: string }) => {
  //   console.log("Creating Team:", values)
  //   // 🚀 Here you can call your API to create the team
  // }

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
          <Button
            onClick={() => setOpenModal(true)}
            className="!text-[16px] flex items-center gap-2 bg-transparent !border-[#FECD1C] !text-black font-medium !py-6"
          >
            <Plus className="h-4 w-4" />
            Invite Team Members
          </Button>
          <Button
            onClick={() => setOpenCreateModal(true)}
            className="!py-6 !bg-yellow-400 hover:bg-yellow-500 text-black hover:!text-black !font-semibold"
          >
            + Create Team
          </Button>
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

      {/* Invite Team Modal */}
      <InviteTeamForm openModal={openModal} setOpenModal={setOpenModal} />

      {/* Create Team Modal */}
      <CreateTeamModal
  open={openCreateModal}
  onClose={() => setOpenCreateModal(false)}
/>

    </div>
  )
}
