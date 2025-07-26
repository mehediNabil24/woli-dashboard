"use client";

import { useState } from "react";
import {
  Table,
  Input,
  Button,
  Pagination,
  Modal,
  Select,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import MetricCard from "../../MetricCard/MetricCard";

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

const initialData: DealRecord[] = Array.from({ length: 10 }, (_, index) => ({
  key: `${index + 1}`,
  date: "12/12/2025",
  company: "Omaha",
  clientPolicy: "BuF5451221",
  writingAssociate: "Emily Carter",
  amount: "$2,21,215",
  chargeback: "$2.21",
  income: "$2,12,111",
}));

const metrics = [
  {
    label: "Total Income",
    value: "0",
    circleColor: "#FF8C38",
  },
  {
    label: "Total Chargebacks",
    value: "25",
    circleColor: "#FFD700",
  },
  {
    label: "Total Amount",
    value: "30",
    circleColor: "#000000",
  },
];

export default function ReportPage() {
  const [dealData, setDealData] = useState<DealRecord[]>(initialData);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState<string>("");

  const associateOptions = [
    "Emily Carter",
    "Michael Smith",
    "Sarah Johnson",
    "David Lee",
  ];

  const handleAddAssociate = (key: string) => {
    setSelectedRowKey(key);
    setIsAssociateModalOpen(true);
  };

  const handleAssociateChange = (value: string) => {
    setSelectedAssociate(value);
  };

  const handleAssociateSubmit = () => {
    if (selectedRowKey && selectedAssociate) {
      const updatedData = dealData.map((deal) =>
        deal.key === selectedRowKey
          ? { ...deal, writingAssociate: selectedAssociate }
          : deal
      );
      setDealData(updatedData);
      setIsAssociateModalOpen(false);
      setSelectedAssociate("");
      setSelectedRowKey(null);
    }
  };

  const columns: ColumnsType<DealRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Client Policy",
      dataIndex: "clientPolicy",
      key: "clientPolicy",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Writing Associate",
      key: "writingAssociate",
      className: "text-gray-700 font-medium",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span>{record.writingAssociate}</span>
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleAddAssociate(record.key)}
          />
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Chargeback",
      dataIndex: "chargeback",
      key: "chargeback",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
      className: "text-gray-700 font-medium",
    },
  ];

  return (
    <div className="">
      {/* Metrics Section */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm mt-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search by name"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full border-gray-300"
              size="middle"
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
            className="add-deals-btn"
          >
            Add New Deals
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={dealData}
            pagination={false}
            className="deals-table"
            rowClassName="hover:bg-gray-50"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">Showing 1-10 of 187</div>

          <Pagination
            current={1}
            total={187}
            pageSize={10}
            showSizeChanger={false}
            className="deals-pagination"
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
                );
              }
              return originalElement;
            }}
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

        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
          background-color: #fbbf24 !important;
          border-color: #fbbf24 !important;
          color: white !important;
        }

        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
          background-color: #f59e0b !important;
          border-color: #f59e0b !important;
        }
      `}
      </style>
    </div>
  );
}
