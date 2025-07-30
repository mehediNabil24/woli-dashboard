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
}

// const data: ApplicationRecord[] = Array.from({ length: 5 }, (_, index) => ({
//   key: `${index + 1}`,
//   date: "12 April,2025",
//   company: "xyz",
//   applicationNo: "Bu154512211",
//   product: "Omaha..",
//   clientName: "John Son",
//   annualPremi: "$2,21,1215",
//   status: "Pending",
// }))

export default function PendingDeal() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<ApplicationRecord | null>(null)
const {data:dealData}= useGetMyDealsQuery("PENDING")
const data = dealData?.data?.data?.map((item: any) => ({
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
  annualPremi: `$${item.annualPremium}`,
  status: item.dealStatus || "",
})) || [];

console.log(data,"data");
  const handleEditClick = (record: ApplicationRecord) => {
    setEditingRecord(record)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setEditingRecord(null) // Clear editing record when modal closes
  }

  const columns: ColumnsType<ApplicationRecord> = [
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
      title: "Application No.",
      dataIndex: "applicationNo",
      key: "applicationNo",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Annual Premi.",
      dataIndex: "annualPremi",
      key: "annualPremi",
      className: "text-gray-700 font-medium",
    },
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
  ]

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-start p-4">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search by name"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
              size="middle"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="application-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
          />
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">Showing 1-10 of 187</div>

          <Pagination
            current={1}
            total={187}
            pageSize={10}
            
            showSizeChanger={false}
            className="application-pagination"
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

      {/* Edit Deal Modal */}
      <EditDealModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        // In a real app, you'd pass editingRecord. This is placeholder data for now.
        initialData={
          editingRecord
            ? {
                agentName: "Emily Carter", // Replace with actual data from editingRecord
                state: "California", // Replace with actual data
                company: "Xyz", // Replace with actual data
                product: "Omaha", // Replace with actual data
                clientFirstName: editingRecord.clientName.split(" ")[0], // Example parsing
                clientLastName: editingRecord.clientName.split(" ")[1], // Example parsing
                applicationNumber: editingRecord.applicationNo,
                annualPremium: editingRecord.annualPremi,
                note: "Wroten by agent thought", // This would come from the record or be empty
              }
            : undefined
        }
      />

      <style>{`
        .application-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
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
          background-color: #f9fafb; /* Light gray on hover */
        }

        .application-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }

        .application-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }

        .application-pagination .ant-pagination-prev button,
        .application-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
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
