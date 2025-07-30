"use client";

import { useState } from "react";
import { Table, Input, Button, Pagination, Modal, Select } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import MetricCard from "../../MetricCard/MetricCard";
import { useGetReportQuery } from "../../../redux/features/agentDeal/agentDealApi";

interface DealRecord {
  key: string;
  date: string;
  company: string;
  clientPolicy: string;
  writingAssociate: string;
  amount: string;
  chargeback: string;
  income: string;
}

const metrics = [
  { label: "Total Income", value: "0", circleColor: "#FF8C38" },
  { label: "Total Chargebacks", value: "25", circleColor: "#FFD700" },
  { label: "Total Amount", value: "30", circleColor: "#000000" },
];

export default function ReportPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fetch deals with pagination and search
  const { data, isLoading, isError } = useGetReportQuery({
    page,
    limit,
    searchTerm: debouncedSearch,
  });

  console.log("Report Data:", data);

  const [, setSelectedRowKey] = useState<string | null>(null);
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState<string>("");

  const associateOptions = ["Emily Carter", "Michael Smith", "Sarah Johnson", "David Lee"];

  const handleAddAssociate = (key: string) => {
    setSelectedRowKey(key);
    setIsAssociateModalOpen(true);
  };

  const handleAssociateChange = (value: string) => setSelectedAssociate(value);

  const handleAssociateSubmit = () => {
    setIsAssociateModalOpen(false);
    setSelectedAssociate("");
    setSelectedRowKey(null);
  };

  // Debounce search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout((window as any).searchTimeout);
    (window as any).searchTimeout = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1); // Reset to first page when searching
    }, 500);
  };

  // Map API data to table
  const deals = data?.data?.data || [];
  const tableData: DealRecord[] = deals.map((item: any) => {
    const writingAssociate =
      item.DealParticipant?.map(
        (p: any) => `${p.agent.profile?.firstName || ""} ${p.agent.profile?.lastName || ""}`.trim()
      ).join(", ") || "N/A";

    return {
      key: item.id,
      date: new Date(item.createdAt).toLocaleDateString(),
      company: item?.company?.companyName || "N/A",
      clientPolicy: item.applicationNumber,
      writingAssociate,
      amount: `$${item.annualPremium}`,
      chargeback: `$${item.chargebackAmount || 0}`,
      income: `$${item.income || 0}`,
    };
  });

  const columns: ColumnsType<DealRecord> = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Company", dataIndex: "company", key: "company" },
    { title: "Client Policy", dataIndex: "clientPolicy", key: "clientPolicy" },
    {
      title: "Writing Associate",
      key: "writingAssociate",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span>{record.writingAssociate}</span>
          <Button icon={<PlusOutlined />} size="small" onClick={() => handleAddAssociate(record.key)} />
        </div>
      ),
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Chargeback", dataIndex: "chargeback", key: "chargeback" },
    { title: "Income", dataIndex: "income", key: "income" },
  ];

  return (
    <div>
      {/* Metrics Section (Static) */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm mt-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search by name"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full border-gray-300"
              size="middle"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#FECD1C",
              borderColor: "#FFD700",
              color: "#000",
              fontWeight: 500,
            }}
            size="middle"
          >
            Add New Deals
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="p-4">Loading...</p>
          ) : isError ? (
            <p className="p-4 text-red-500">Failed to load report</p>
          ) : (
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              className="deals-table"
              rowClassName="hover:bg-gray-50"
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {tableData.length} of {data?.data?.meta?.total || 0}
          </div>
          <Pagination
            current={data?.data?.meta?.page || 1}
            total={data?.data?.meta?.total || 0}
            pageSize={data?.data?.meta?.limit || 10}
            showSizeChanger={false}
            onChange={(newPage) => setPage(newPage)}
            className="deals-pagination"
          />
        </div>
      </div>

      {/* Writing Associate Modal */}
      <Modal
        title="Select Writing Associate"
        open={isAssociateModalOpen}
        onOk={handleAssociateSubmit}
        onCancel={() => setIsAssociateModalOpen(false)}
        okText="Add"
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select an associate"
          onChange={handleAssociateChange}
          value={selectedAssociate}
        >
          {associateOptions.map((name) => (
            <Select.Option key={name} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Modal>

      <style>
        {`
        .deals-table .ant-table-thead > tr > th {
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .deals-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .deals-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb;
        }
        .deals-pagination .ant-pagination-item-active {
          background-color: #fbbf24;
          border-color: #fbbf24;
        }
        .deals-pagination .ant-pagination-item-active a {
          color: #000;
        }
      `}
      </style>
    </div>
  );
}
