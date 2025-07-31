"use client"

import { useState, useEffect } from "react"
import { Table, Button, Dropdown, Menu, Spin, Input, message, Modal } from "antd"
import { MoreOutlined, PlusOutlined, SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import type { ColumnsType, TablePaginationConfig } from "antd/es/table"
import EditDealListModal from "./DealListModal"
import { useGetProductQuery, useDeleteProductMutation } from "../../redux/features/product/productApi"

interface DealRecord {
  key: string
  company: string
  product: string
  commissions: string
  applicationNo: string
  chargeback: string
}

const { confirm } = Modal

export default function DealListPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<DealRecord | null>(null)
  const [tableData, setTableData] = useState<DealRecord[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [search, setSearch] = useState("")

  const { data, isLoading, isError, refetch } = useGetProductQuery({
    page,
    limit,
    searchTerm: search,
  })

  const [deleteProduct] = useDeleteProductMutation()

  useEffect(() => {
    if (data?.success && Array.isArray(data.data)) {
      const formattedData = data.data.map((item: any) => ({
        key: item.id,
        company: item.company?.companyName || "N/A",
        product: item.productName,
        commissions: item.commission,
        applicationNo: item.applicationNumber,
        chargeback: "$0",
      }))
      setTableData(formattedData)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      message.error("Failed to fetch product data.")
    }
  }, [isError])

  const handleEditClick = (record: DealRecord) => {
    setEditingRecord(record)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setEditingRecord(null)
  }

  const handleSave = (updatedData: any) => {
    setTableData((prevData) =>
      prevData.map((record) => (record.key === updatedData.key ? { ...record, ...updatedData } : record))
    )
  }

  const handleDeleteClick = (record: DealRecord) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: `Product: ${record.product}`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const res = await deleteProduct(record.key).unwrap()
          if (res?.success) {
            message.success("Product deleted successfully")
            refetch()
          } else {
            message.error(res?.message || "Failed to delete product")
          }
        } catch (error: any) {
          message.error(error?.data?.message || "Delete failed")
        }
      },
    })
  }

  const handleMenuClick = (record: DealRecord, e: any) => {
    if (e.key === "edit") {
      handleEditClick(record)
    } else if (e.key === "delete") {
      handleDeleteClick(record)
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) setPage(pagination.current)
    if (pagination.pageSize) setLimit(pagination.pageSize)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
    refetch()
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
            <Menu onClick={(e) => handleMenuClick(record, e)}>
              <Menu.Item key="edit">Edit</Menu.Item>
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
    <div className=" bg-white min-h-screen">
      <div className="bg-white rounded-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
          <Input
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full md:w-64"
          />
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
          {isLoading ? (
            <Spin size="large" className="flex justify-center p-6" />
          ) : (
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{
                current: page,
                pageSize: limit,
                total: data?.meta?.total || 0,
                showSizeChanger: true,
              }}
              onChange={handleTableChange}
              className="deal-list-table"
              rowClassName={(_, index) => (index % 2 === 0 ? "bg-white" : "bg-white")}
            />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingRecord && (
        <EditDealListModal
          visible={isModalVisible}
          onCancel={handleModalCancel}
          initialData={{
            key: editingRecord.key,
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
          background-color: #f9fafb;
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
          background-color: #f9fafb;
        }
      `}</style>
    </div>
  )
}
