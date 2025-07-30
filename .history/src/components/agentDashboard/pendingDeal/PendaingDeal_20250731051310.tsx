/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Table, Input, Pagination, Dropdown, Menu } from "antd"
import { SearchOutlined, MoreOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import EditDealModal from "./ModalPending"
import { useGetMyDealsQuery } from "../../../redux/features/deals/dealsApi"

interface ApplicationRecord {

  key: string
  date: string
  company: string
  applicationNo: string
  product: string
  clientName: string
  annualPremi: string
  status: string
  state: string,
  note: string

}

export default function PendingDeal() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<ApplicationRecord | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Search state
  const [searchTerm, setSearchTerm] = useState("")

  // API Call with pagination + search
  const { data: dealData, isFetching } = useGetMyDealsQuery({
    status: "PENDING",
    page: currentPage,
    limit: pageSize,
    searchTerm: searchTerm || undefined, 
  })

  const tableData: ApplicationRecord[] =
    dealData?.data?.data?.map((item: any) => ({
      key: item.id,
      date: new Date(item.dealDate).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      company: item.company?.companyName || "",
      applicationNo: item.applicationNumber || "",
      product: item.product?.productName || "",
      clientName: `${item.clientFirstName || ""} ${item.clientLastName || ""}`,
      clientLastName:item.
      annualPremi: `$${item.annualPremium}`,
      status: item.dealStatus || "",
      state: item.state,
      note: item.note
    })) || []

  const totalItems = dealData?.data?.meta?.total || 0

  const handleEditClick = async (record: ApplicationRecord) => {
    setEditingRecord(record)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setEditingRecord(null)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) 
  }

  const columns: ColumnsType<ApplicationRecord> = [
    { title: "Date", dataIndex: "date", key: "date", className: "text-gray-700 font-medium" },
    { title: "Company", dataIndex: "company", key: "company", className: "text-gray-700 font-medium" },
    { title: "Application No.", dataIndex: "applicationNo", key: "applicationNo", className: "text-gray-700 font-medium" },
    { title: "Product", dataIndex: "product", key: "product", className: "text-gray-700 font-medium" },
    { title: "Client Name", dataIndex: "clientName", key: "clientName", className: "text-gray-700 font-medium" },
    { title: "Annual Premi.", dataIndex: "annualPremi", key: "annualPremi", className: "text-gray-700 font-medium" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "text-gray-700 font-medium",
      render: (text: string) => (
        <div className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-600 font-semibold text-sm">
          {text}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      className: "text-gray-700 font-medium",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
             <Menu.Item
  key="edit"
  onClick={(e) => {
    e.domEvent.stopPropagation(); 
    handleEditClick(record);
  }}
>
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
  ]

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-start p-4">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search by name"
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={handleSearch}
              className="rounded-full border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
              size="middle"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isFetching}
            pagination={false}
            className="application-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
          </div>

          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="application-pagination"
            itemRender={(page, type, originalElement) => {
              if (type === "page") {
                return (
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium border ${page === currentPage
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

      {/* Edit Modal */}
      <EditDealModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        initialData={editingRecord}
        
      />
      <style>{`
        .application-table .ant-table-thead > tr > th {
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .application-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .application-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb;
        }
        .application-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important;
          border-color: #fbbf24 !important;
        }
        .application-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .application-pagination .ant-pagination-prev button,
        .application-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .application-pagination .ant-pagination-prev button:hover,
        .application-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
        .ant-input-affix-wrapper-focused {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
      `}</style>
    </div>
  )
}
