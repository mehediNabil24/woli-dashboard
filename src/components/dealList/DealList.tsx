"use client"

import { useState } from "react"
import { Table, Button, Dropdown, Menu } from "antd"
import { MoreOutlined, PlusOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import EditDealListModal from "./DealListModal"


interface DealRecord {
  key: string
  company: string
  product: string
  commissions: string
  applicationNo: string
  chargeback: string // Added for modal data
}

const initialData: DealRecord[] = [
  {
    key: "1",
    company: "xyz",
    product: "Omapa",
    commissions: "$1234",
    applicationNo: "#fsd1234",
    chargeback: "$1,241,245",
  },
  {
    key: "2",
    company: "xyz",
    product: "Omapa",
    commissions: "$1234",
    applicationNo: "#fsd1234",
    chargeback: "$1,241,245",
  },
  {
    key: "3",
    company: "xyz",
    product: "Omapa",
    commissions: "$1234",
    applicationNo: "#fsd1234",
    chargeback: "$1,241,245",
  },
]

export default function DealListPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<DealRecord | null>(null)
  const [tableData, setTableData] = useState<DealRecord[]>(initialData)

  const handleEditClick = (record: DealRecord) => {
    setEditingRecord(record)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setEditingRecord(null) // Clear editing record when modal closes
  }

  const handleSave = (updatedData: any) => {
    setTableData((prevData) =>
      prevData.map((record) => (record.key === updatedData.key ? { ...record, ...updatedData } : record)),
    )
  }

  const columns: ColumnsType<DealRecord> = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Commissions",
      dataIndex: "commissions",
      key: "commissions",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Application No",
      dataIndex: "applicationNo",
      key: "applicationNo",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Actions",
      key: "actions",
      className: "text-gray-700 font-medium",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEditClick(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete">Delete</Menu.Item>
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
    <div className="p-6 bg-white min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-end p-4">
            <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 24px",
              height: "auto",
              fontWeight: 600,
            }}
            className="add-deals-btn"
            >
            Add Deals
            </Button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            className="deal-list-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-white")} // All rows white
          />
        </div>
      </div>

      {/* Edit Deal List Modal */}
      {editingRecord && (
        <EditDealListModal
          visible={isModalVisible}
          onCancel={handleModalCancel}
          initialData={{
            company: editingRecord.company,
            product: editingRecord.product,
            commissions: editingRecord.commissions,
            chargeback: editingRecord.chargeback,
            applicationNumber: editingRecord.applicationNo,
          }}
          onSave={handleSave}
        />
      )}

      <style>{`
        .deal-list-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .deal-list-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .deal-list-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
      `}</style>
    </div>
  )
}
