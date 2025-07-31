"use client"

import { useState, useEffect } from "react"
import { Table, Pagination, Button, Spin } from "antd"
import type { ColumnsType } from "antd/es/table"
import EditRankModal from "./EditLevel"
import { useGetLevelQuery } from "../../redux/features/level/levelApi" // ✅ Import API hook

interface LevelRecord {
  key: string
  levelOrder: number
  levelName: string
  percentage: number
}

export default function LevelPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<LevelRecord | null>(null)
  const [tableData, setTableData] = useState<LevelRecord[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  // ✅ Fetch data from API
  const { data, isLoading } = useGetLevelQuery({ page: currentPage, limit: 10 })

  useEffect(() => {
    if (data?.data) {
      setTableData(
        data.data.map((item: any) => ({
          key: item.id,
          levelOrder: item.levelOrder,
          levelName: item.levelName,
          percentage: item.percentage,
        }))
      )
    }
  }, [data])

  const handleEditClick = (record: LevelRecord) => {
    setEditingRecord(record)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setEditingRecord(null)
  }

  const handleSave = (updatedData: any) => {
    setTableData((prevData) =>
      prevData.map((record) =>
        record.key === editingRecord?.key ? { ...record, ...updatedData } : record
      )
    )
  }

  const columns: ColumnsType<LevelRecord> = [
    {
      title: "Level Order",
      dataIndex: "levelOrder",
      key: "levelOrder",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Level Name",
      dataIndex: "levelName",
      key: "levelName",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      className: "text-gray-700 font-medium",
      render: (value: number) => `${value}%`,
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
    <div className=" min-h-screen">
      <div className="bg-white rounded-lg ">
        {/* Loader */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <>
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
              <div className="text-sm text-gray-600">
                Showing {data?.meta?.page}-{data?.meta?.limit} of {data?.meta?.total}
              </div>

              <Pagination
                current={currentPage}
                total={data?.meta?.total || 0}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                className="rank-list-pagination"
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
                    )
                  }
                  return originalElement
                }}
              />
            </div>
          </>
        )}
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
    </div>
  )
}
