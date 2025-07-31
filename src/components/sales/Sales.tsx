"use client";

import { useState, useEffect } from "react";
import { Table, Input, Pagination, Dropdown, Menu, Avatar, Spin } from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Select } from "antd";
import SalesDetailsPage from "./SalesDetails";
import img1 from "../../assets/Rectangle 55.png";
import img2 from "../../assets/fi_555526.png";
import { useGetChargebackQuery } from "../../redux/features/agent/agentApi";

const { Option } = Select;

interface SalesRecord {
  key: string;
  agentProfile: {
    name: string;
    avatar: string;
    flag: string;
  };
  commissionPaidToAgent: string;
  annualPremiumTotal: string;
  chargeback: string;
  agentNotes: string;
  status: "Chargeback Paid" | "Paid" | "Toward";
  contactNumber: string;
  dateOfBirth: string;
  email: string;
  rank: string;
  isVerified: boolean;
  transactions: SalesTransactionRecord[];
}

interface SalesTransactionRecord {
  key: string;
  date: string;
  carrier: string;
  clientName: string;
  annualPremiumTotal: string;
  chargeback: string;
  commissionPaidToAgent: string;
  dateTimeCommissionPaid: string;
  closer: string;
  agentNotes: string;
  status: "Paid" | "Toward" | "Chargeback Paid";
}

export default function SalesPage() {
  const [selectedSale, setSelectedSale] = useState<SalesRecord | null>(null);
  const [tableData, setTableData] = useState<SalesRecord[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch data from API with pagination and search
  const { data, isLoading, isError } = useGetChargebackQuery({
    page,
    limit: 10,
    searchTerm: searchTerm,
  });

  // ✅ Map API response to SalesRecord format
  useEffect(() => {
    if (data?.data) {
      const mappedData = data.data.map((item: any, index: number) => ({
        key: item.id,
        agentProfile: {
          name: `${item.clientFirstName} ${item.clientLastName}`,
          avatar: img1,
          flag: img2,
        },
        commissionPaidToAgent: item.income ? `$${item.income}` : "$0",
        annualPremiumTotal: `$${item.annualPremium}`,
        chargeback: item.chargebackAmount ? `$${item.chargebackAmount}` : "$0",
        agentNotes: item.note || "",
        status:
          item.chargebackstatus === "PAID"
            ? "Paid"
            : item.chargebackstatus === "TOWARD"
            ? "Toward"
            : "Chargeback Paid",
        contactNumber: "+1 000000000",
        dateOfBirth: "N/A",
        email: "N/A",
        rank: String(index + 1).padStart(2, "0"),
        isVerified: item.dealStatus === "APPROVED",
        transactions: [
          {
            key: `${item.id}-txn`,
            date: new Date(item.dealDate).toLocaleDateString(),
            carrier: item.company?.companyName || "",
            clientName: `${item.clientFirstName} ${item.clientLastName}`,
            annualPremiumTotal: `$${item.annualPremium}`,
            chargeback: item.chargebackAmount ? `$${item.chargebackAmount}` : "$0",
            commissionPaidToAgent: item.income ? `$${item.income}` : "$0",
            dateTimeCommissionPaid: item.commissionPaidDate
              ? new Date(item.commissionPaidDate).toLocaleString()
              : "N/A",
            closer: "N/A",
            agentNotes: item.note || "",
            status:
              item.chargebackstatus === "PAID"
                ? "Paid"
                : item.chargebackstatus === "TOWARD"
                ? "Toward"
                : "Chargeback Paid",
          },
        ],
      }));

      setTableData(mappedData);
    }
  }, [data]);

  const handleDetailsClick = (record: SalesRecord) => setSelectedSale(record);
  const handleBackToSalesList = () => setSelectedSale(null);

  const handleStatusChange = (key: string, newStatus: SalesRecord["status"]) => {
    setTableData((prev) =>
      prev.map((record) => (record.key === key ? { ...record, status: newStatus } : record))
    );
  };

  // 🔍 Handle search with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1); // reset to page 1
  };

  const columns: ColumnsType<SalesRecord> = [
    {
      title: "Agent Profile",
      dataIndex: "agentProfile",
      key: "agentProfile",
      render: (profile) => (
        <div className="flex items-center space-x-2">
          <Avatar src={profile.avatar} size="large" />
          <img src={profile.flag} alt="Flag" width={16} height={16} />
          <span>{profile.name}</span>
        </div>
      ),
    },
    { title: "Commission Paid", dataIndex: "commissionPaidToAgent", key: "commissionPaidToAgent" },
    { title: "Annual Premium", dataIndex: "annualPremiumTotal", key: "annualPremiumTotal" },
    { title: "Chargeback", dataIndex: "chargeback", key: "chargeback" },
    {
      title: "Agent's Notes",
      dataIndex: "status",
      key: "agentNotes",
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.key, value)}
          className="w-full"
        >
          <Option value="Chargeback Paid">Chargeback Unpaid</Option>
          <Option value="Toward">Paid Towards</Option>
          <Option value="Paid">Paid</Option>
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
              <Menu.Item key="details" onClick={() => handleDetailsClick(record)}>
                Details
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined className="text-lg cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  if (isLoading) return <Spin size="large" className="mt-20 flex justify-center" />;
  if (isError) return <div className="text-red-500 p-4">Failed to load data.</div>;

  if (selectedSale) {
    return (
      <SalesDetailsPage
        agentInfo={{
          name: selectedSale.agentProfile.name,
          avatar: selectedSale.agentProfile.avatar,
          contactNumber: selectedSale.contactNumber,
          dateOfBirth: selectedSale.dateOfBirth,
          email: selectedSale.email,
          rank: selectedSale.rank,
          status: selectedSale.status,
          isVerified: selectedSale.isVerified,
        }}
        transactions={selectedSale.transactions}
        onBack={handleBackToSalesList}
      />
    );
  }

  return (
    <div className=" min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-end p-4">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={handleSearchChange}
              value={searchTerm}
              className="rounded-md border-gray-300"
            />
          </div>
        </div>

        {/* Table Section */}
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowClassName={(record) =>
            record.status === "Chargeback Paid"
              ? "bg-red-100"
              : record.status === "Toward"
              ? "bg-blue-100"
              : "bg-green-100"
          }
        />

        {/* Footer Section */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {data?.meta?.page}-{data?.meta?.limit} of {data?.meta?.total}
          </div>
          <Pagination
            current={data?.meta?.page}
            total={data?.meta?.total}
            pageSize={data?.meta?.limit}
            onChange={(newPage) => setPage(newPage)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
