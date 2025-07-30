"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Table, Input, Pagination, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import EditCompanyModal from "./CompanyListModal";
import { useGetCompanyQuery } from "../../redux/features/product/productApi";


interface CompanyRecord {
  key: string;
  company: string;
  totalProduct: number;
}

export default function CompanyListPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CompanyRecord | null>(null);
  const [tableData, setTableData] = useState<CompanyRecord[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ API call
  const { data, isLoading, isError } = useGetCompanyQuery({ page: currentPage, limit: 10 });

  // ✅ Map API data to table format
  useEffect(() => {
    if (data?.data) {
      setTableData(
        data.data.map((item: any, ) => ({
          key: item.id,
          company: item.companyName,
          totalProduct: 12, // Placeholder (adjust based on API)
        }))
      );
    }
  }, [data]);

  const handleEditClick = (record: CompanyRecord) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleSave = (updated: { companyName: string }) => {
    if (editingRecord) {
      setTableData((prevData) =>
        prevData.map((record) =>
          record.key === editingRecord.key ? { ...record, company: updated.companyName } : record
        )
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = tableData.filter((record) =>
    record.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<CompanyRecord> = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Total Product",
      dataIndex: "totalProduct",
      key: "totalProduct",
      className: "text-gray-700 font-medium",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      className: "text-gray-700 font-medium",
      align: "center",
      render: (_, record) => (
        <button
          onClick={() => handleEditClick(record)}
          className="text-gray-600 hover:text-gray-800 font-medium text-sm bg-transparent border-none cursor-pointer"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white">
        {/* Header Section with Search */}
        <div className="flex items-center justify-end mb-6">
          <div className="relative">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full border-gray-300 w-64 search-input"
              size="middle"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          ) : isError ? (
            <div className="text-center text-red-500">Failed to load data.</div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={false}
              className="company-list-table"
              rowClassName="bg-white hover:bg-gray-50"
            />
          )}
        </div>

        {/* Footer Section with Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * 10 + 1}-
            {Math.min(currentPage * 10, data?.meta?.total || 0)} of {data?.meta?.total || 0}
          </div>
          <Pagination
            current={currentPage}
            total={data?.meta?.total || 0}
            pageSize={10}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="company-list-pagination"
            itemRender={(page, type, originalElement) => {
              if (type === "page") {
                return (
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium border ${
                      page === currentPage
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

      {/* Edit Company Modal */}
      {editingRecord && (
        <EditCompanyModal
          visible={isModalVisible}
          onCancel={handleModalCancel}
          initialData={{ companyName: editingRecord.company, id: editingRecord.key }}
          onSave={handleSave}
        />
      )}

      <style>{`
        .company-list-table .ant-table-thead > tr > th {
          background-color: #e5e7eb !important;
          border-bottom: 1px solid #d1d5db;
          font-weight: 500;
          color: #374151;
          padding: 16px;
          text-align: left;
        }
        .company-list-table .ant-table-thead > tr > th:nth-child(2),
        .company-list-table .ant-table-thead > tr > th:nth-child(3) {
          text-align: center;
        }
        .company-list-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 16px;
          color: #374151;
        }
        .company-list-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb;
        }
        .company-list-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important;
          border-color: #fbbf24 !important;
        }
        .company-list-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .company-list-pagination .ant-pagination-prev button,
        .company-list-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .company-list-pagination .ant-pagination-prev button:hover,
        .company-list-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
        .search-input .ant-input-affix-wrapper {
          border-radius: 20px !important;
          border-color: #d1d5db !important;
        }
        .search-input .ant-input-affix-wrapper:hover {
          border-color: #9ca3af !important;
        }
        .search-input .ant-input-affix-wrapper-focused {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
