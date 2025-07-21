"use client"

import { useState } from "react"
import { Table, Pagination, Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import EditRankModal from "./EditLevel"


interface RankRecord {
  key: string
  rank: string
  percentage: string
}

const initialData: RankRecord[] = [
  {
    key: "1",
    rank: "Level 1 (Train)",
    percentage: "05%",
  },
  {
    key: "2",
    rank: "Level 2 (Train)",
    percentage: "25%",
  },
  {
    key: "3",
    rank: "Level 3 (Train)",
    percentage: "50%",
  },
  {
    key: "4",
    rank: "Level 4 (Train)",
    percentage: "65%",
  },
  {
    key: "5",
    rank: "Level 5 (Train)",
    percentage: "90%",
  },
  {
    key: "6",
    rank: "Special (Custom)",
    percentage: "12.5%",
  },
]

export default function LevelPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<RankRecord | null>(null)
  const [tableData, setTableData] = useState<RankRecord[]>(initialData)

  const handleEditClick = (record: RankRecord) => {
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

  const columns: ColumnsType<RankRecord> = [
    {
      title: "Ranks",
      dataIndex: "rank",
      key: "rank",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Action",
      key: "action",
      className: "text-gray-700 font-medium",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEditClick(record)} className="p-0 h-auto">
          Edit
        </Button>
      ),
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            className="rank-list-table"
            rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-white")}
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
            className="rank-list-pagination"
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

      {/* Edit Rank Modal */}
      {editingRecord && (
        <EditRankModal
          visible={isModalVisible}
          onCancel={handleModalCancel}
          initialData={editingRecord}
          onSave={handleSave}
        />
      )}

      <style>{`
        .rank-list-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .rank-list-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .rank-list-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .rank-list-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .rank-list-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .rank-list-pagination .ant-pagination-prev button,
        .rank-list-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .rank-list-pagination .ant-pagination-prev button:hover,
        .rank-list-pagination .ant-pagination-next button:hover {
          border-color: #9ca3af;
        }
      `}</style>
    </div>
  )
}
