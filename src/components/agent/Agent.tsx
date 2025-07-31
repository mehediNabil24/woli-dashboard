"use client";

import { useState } from "react";
import { Table, Input, Pagination, Dropdown, Menu, Avatar, Select, Spin } from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useGetAgentQuery } from "../../redux/features/agent/agentApi";


const { Option } = Select;

interface AgentProfile {
  firstName: string;
  lastName: string;
  imageUrl?: string | null;
}

interface AgentRecord {
  id: string;
  email: string;
  approvalStatus: "APPROVED" | "PENDING" | "REJECTED";
  profile: AgentProfile;
  level?: string | null;
  dateOfBirth?: string;
}

export default function AgentListPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading } = useGetAgentQuery({
    page,
    limit: pageSize,
    searchTerm: searchTerm || undefined,
    approvalStatus: statusFilter || undefined,
  });

  const agents: AgentRecord[] = data?.data || [];
  const total = data?.meta?.total || 0;

  const columns: ColumnsType<AgentRecord> = [
    {
      title: "Agent Profile",
      key: "agentProfile",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Avatar src={record.profile?.imageUrl || "/placeholder.svg"} size="large" />
          <span>{record.profile?.firstName} {record.profile?.lastName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Date of Birth",
    //   key: "dateOfBirth",
    //   render: (_, record) => record.profile?.dateOfBirth || "N/A",
    // },
    {
      title: "Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      render: (status: AgentRecord["approvalStatus"]) => (
        <div
          className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-sm font-medium ${
            status === "APPROVED"
              ? "bg-green-100 text-green-800"
              : status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="details"
                onClick={() => navigate(`/dashboard/admin/agent/${record.id}`)}
              >
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
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-end p-4 space-x-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-md border-gray-300 w-64 focus:border-yellow-400 focus:ring-yellow-400"
            size="middle"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            placeholder="Status"
            style={{ width: 140 }}
            size="middle"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            allowClear
          >
            <Option value="APPROVED">Approved</Option>
            <Option value="PENDING">Pending</Option>
            <Option value="REJECTED">Rejected</Option>
          </Select>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={agents.map((agent) => ({ ...agent, key: agent.id }))}
              pagination={false}
              rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
            />
          )}
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * pageSize + 1}-
            {Math.min(page * pageSize, total)} of {total}
          </div>
          <Pagination
            current={page}
            total={total}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
}
