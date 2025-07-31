"use client";

import { useState } from "react";
import { Table, Input, Pagination, Dropdown, Menu, Avatar, Select, Spin } from "antd";
import { SearchOutlined, MoreOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import EditDealRequestModal from "./EditDealRequest";
import { useGetAgentDealRequestQuery, useUpdateDealStatusMutation } from "../../redux/features/agent/agentApi";
import { toast } from "sonner";

const { Option } = Select;

interface DealRequestRecord {
  key: string;
  id: string;
  agentProfile: {
    name: string;
    avatar: string;
    flag: string;
    rank: string;
    rating: number;
  };
  product: string;
  company: string;
  annualPremium: number;
  applicationNo: string;
  chargeback: string;
  status: "APPROVED" | "REJECTED" | "PENDING";
}

export default function DealRequestPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DealRequestRecord | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch } = useGetAgentDealRequestQuery({ page, limit: 10, searchTerm });
  const [updateDealStatus] = useUpdateDealStatusMutation();

  const deals = data?.data || [];

  const tableData: DealRequestRecord[] = deals.map((deal: any) => ({
    key: deal.id,
    id: deal.id,
    agentProfile: {
      name: `${deal.clientFirstName} ${deal.clientLastName}`,
      avatar: "/placeholder.svg",
      flag: "/placeholder.svg",
      rank: "Rank Level 1",
      rating: 5,
    },
    product: deal.product?.productName || "N/A",
    company: deal.company?.companyName || "N/A",
    annualPremium: deal.annualPremium, // ✅ keep number
    applicationNo: deal.applicationNumber,
    chargeback: deal.chargebackAmount ? `$${deal.chargebackAmount}` : "$0",
    status: deal.dealStatus as "APPROVED" | "REJECTED" | "PENDING",
  }));

  const handleStatusChange = async (dealId: string, value: string) => {
    try {
      const response = await updateDealStatus({
        id: dealId,
        body: { status: value },
      }).unwrap();

      toast.success(response?.message || "Status updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleEditClick = (record: DealRequestRecord) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const columns: ColumnsType<DealRequestRecord> = [
    {
      title: "Agent Profile",
      dataIndex: "agentProfile",
      key: "agentProfile",
      render: (profile) => (
        <div className="flex items-center space-x-2">
          <Avatar src={profile.avatar} size="large" />
          <span>{profile.name}</span>
        </div>
      ),
    },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Company", dataIndex: "company", key: "company" },
    {
      title: "Annual Premium",
      dataIndex: "annualPremium",
      key: "annualPremium",
      render: (value) => `$${value}`, // ✅ Only format for display
    },
    { title: "Application No", dataIndex: "applicationNo", key: "applicationNo" },
    { title: "Chargeback", dataIndex: "chargeback", key: "chargeback" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          className={`status-select ${status === "APPROVED" ? "status-approved" : "status-rejected"}`}
          suffixIcon={status === "APPROVED" ? <CheckOutlined /> : <CloseOutlined />}
        >
          <Option value="APPROVED">Approved</Option>
          <Option value="REJECTED">Rejected</Option>
          <Option value="PENDING">Pending</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEditClick(record)}>
                Edit
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
    <div className=" min-h-screen">
      <div className="bg-white rounded-lg ">
        <div className="flex items-center justify-end p-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-md border-gray-300 w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table columns={columns} dataSource={tableData} pagination={false} />
        )}

        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {data?.meta.page}-{data?.meta.limit} of {data?.meta.total}
          </div>
          <Pagination
            current={page}
            total={data?.meta.total || 0}
            pageSize={10}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      </div>

      {editingRecord && (
        <EditDealRequestModal
          visible={isModalVisible}
          onCancel={handleModalCancel}
          onSave={(updatedData) => {
            console.log("Updated Deal Data:", updatedData);
            setIsModalVisible(false);
          }}
          initialData={{
            id: editingRecord.id,
            annualPremium: editingRecord.annualPremium, // ✅ number passed
            agentProfile: editingRecord.agentProfile,
          }}
        />
      )}
    </div>
  );
}
