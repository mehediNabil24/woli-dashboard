"use client"

import { useState } from "react"
import { Table, Input, Pagination, Dropdown, Menu, Avatar, Select } from "antd"
import { SearchOutlined, MoreOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import EditDealRequestModal from "./EditDealRequest"
import img1 from '../../assets/Rectangle 55.png';
import img2 from '../../assets/fi_555526.png';


const { Option } = Select

interface DealRequestRecord {
  key: string
  agentProfile: {
    name: string
    avatar: string
    flag: string
    rank: string
    rating: number
  }
  product: string
  company: string
  annualPremium: string
  applicationNo: string
  chargeback: string
  status: "Approved" | "Rejected" | "Pending" // Added "Pending" for completeness
}

const initialData: DealRequestRecord[] = [
  {
    key: "1",
    agentProfile: {
      name: "Tiana Torff",
      avatar: img1,
      flag: img2,
  
      rank: "Rank Level 1",
      rating: 5,
    },
    product: "Omaha",
    company: "xyz",
    annualPremium: "$1,22,102",
    applicationNo: "#Bu124141",
    chargeback: "$00",
    status: "Approved",
  },
  {
    key: "2",
    agentProfile: {
      name: "Tiana Torff",
        avatar: img1,
      flag: img2,
      rank: "Rank Level 1",
      rating: 4,
    },
    product: "Omaha",
    company: "xyz",
    annualPremium: "$1,22,102",
    applicationNo: "#Bu124141",
    chargeback: "$1234",
    status: "Approved",
  },
  {
    key: "3",
    agentProfile: {
      name: "Tiana Torff",
       avatar: img1,
      flag: img2,
      rank: "Rank Level 1",
      rating: 3,
    },
    product: "Omaha",
    company: "xyz",
    annualPremium: "$1,22,102",
    applicationNo: "#Bu124141",
    chargeback: "$1234",
    status: "Approved",
  },
  {
    key: "4",
    agentProfile: {
      name: "Tiana Torff",
        avatar: img1,
      flag: img2,
      rank: "Rank Level 1",
      rating: 2,
    },
    product: "Omaha",
    company: "xyz",
    annualPremium: "$1,22,102",
    applicationNo: "#Bu124141",
    chargeback: "$1234",
    status: "Rejected",
  },
]

export default function DealRequestPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<DealRequestRecord | null>(null)
  const [tableData, setTableData] = useState<DealRequestRecord[]>(initialData)

  const handleEditClick = (record: DealRequestRecord) => {
    setEditingRecord(record)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setEditingRecord(null) // Clear editing record when modal closes
  }

  const handleSave = (updatedData: any) => {
    setTableData((prevData) =>
      prevData.map((record) => (record.key === editingRecord?.key ? { ...record, ...updatedData } : record)),
    )
  }

  const handleStatusChange = (key: string, newStatus: "Approved" | "Rejected" | "Pending") => {
    setTableData((prevData) =>
      prevData.map((record) => (record.key === key ? { ...record, status: newStatus } : record)),
    )
  }

  const columns: ColumnsType<DealRequestRecord> = [
    {
      title: "Agent Profile",
      dataIndex: "agentProfile",
      key: "agentProfile",
      className: "text-gray-700 font-medium",
      render: (profile: { name: string; avatar: string; flag: string }) => (
        <div className="flex items-center space-x-2">
          <Avatar src={profile.avatar} size="large" />
          <img src={profile.flag || "/placeholder.svg"} alt="Flag" width={16} height={16} />
          <span>{profile.name}</span>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Annual Premium",
      dataIndex: "annualPremium",
      key: "annualPremium",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Application No",
      dataIndex: "applicationNo",
      key: "applicationNo",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Chargeback",
      dataIndex: "chargeback",
      key: "chargeback",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "text-gray-700 font-medium",
      render: (status: "Approved" | "Rejected" | "Pending", record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.key, value)}
          className={`status-select ${status === "Approved" ? "status-approved" : "status-rejected"}`}
          suffixIcon={status === "Approved" ? <CheckOutlined /> : <CloseOutlined />}
        >
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Pending">Pending</Option>
        </Select>
      ),
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-end p-4">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-md border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
              size="middle"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            className="deal-request-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-white")}
          />
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-center p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mr-auto">Showing 1-10 of 187</div>
          <Pagination
            current={1}
            total={187}
            pageSize={10}
            showSizeChanger={false}
            className="deal-request-pagination"
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

      {/* Edit Deal Request Modal */}
      {editingRecord && (
        <EditDealRequestModal
          visible={isModalVisible}
          onCancel={handleModalCancel}
          initialData={{
            company: editingRecord.company,
            product: editingRecord.product,
            annualPremium: editingRecord.annualPremium,
            chargeback: editingRecord.chargeback,
            agentProfile: {
              name: editingRecord.agentProfile.name,
              avatar: editingRecord.agentProfile.avatar,
              rank: editingRecord.agentProfile.rank,
              rating: editingRecord.agentProfile.rating,
            },
          }}
          onSave={handleSave}
        />
      )}

      <style>{`
        .deal-request-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .deal-request-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .deal-request-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .deal-request-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .deal-request-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .deal-request-pagination .ant-pagination-prev button,
        .deal-request-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .deal-request-pagination .ant-pagination-prev button:hover,
        .deal-request-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
        .ant-input-affix-wrapper-focused {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }

        /* Custom styles for status select */
        .status-select .ant-select-selector {
          border-radius: 4px !important;
          padding: 4px 8px !important;
          height: auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }
        .status-select.status-approved .ant-select-selector {
          background-color: #dcfce7 !important; /* Green-100 */
          border-color: #86efac !important; /* Green-300 */
          color: #16a34a !important; /* Green-600 */
        }
        .status-select.status-rejected .ant-select-selector {
          background-color: #fee2e2 !important; /* Red-100 */
          border-color: #fca5a5 !important; /* Red-300 */
          color: #dc2626 !important; /* Red-600 */
        }
        .status-select .ant-select-arrow {
          color: inherit !important; /* Inherit color from parent */
        }
        .status-select .ant-select-selection-item {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
