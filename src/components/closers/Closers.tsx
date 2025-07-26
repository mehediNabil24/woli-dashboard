"use client"

import { Table, Input, Pagination } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import MetricCard from "../MetricCard/MetricCard"

interface CloserRecord {
  key: string
  date: string
  carrier: string
  clientName: string
  annualPremiumTotal: string
  chargeback: string
  closer: string
  transferAgent: string
}

const data: CloserRecord[] = Array.from({ length: 10 }, (_, index) => ({
  key: `${index + 1}`,
  date: "6/9/2025",
  carrier: "Americo (ADB)",
  clientName: index % 2 === 0 ? "Ekstrom Bothman" : "Marilyn Rosser",
  annualPremiumTotal: "$1234",
  chargeback: "$1234",
  closer: index % 2 === 0 ? "Terry George" : "Tiana Rosser",
  transferAgent: index % 2 === 0 ? "Terry Schleifer" : "Emerson Siphron",
}))

    const metrics = [
        {
            label: 'Total Cleint',
            value:"$2126", // Static value from the image
            circleColor: '#FF8C38', // Orange color from the image
        },
        {
            label: 'Total Annual Premium',
            value: '$5426', // Static value from the image
            circleColor: '#FFD700', // Yellow color from the image
        },
        {
            label: 'Total Chargebacks',
            value: '$13426', // Static value from the image
            circleColor: '#000000', // Black color from the image
        },
      
    ] ;

export default function ClosersPage() {
  const columns: ColumnsType<CloserRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Annual Premium Total",
      dataIndex: "annualPremiumTotal",
      key: "annualPremiumTotal",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Chargeback",
      dataIndex: "chargeback",
      key: "chargeback",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Closer",
      dataIndex: "closer",
      key: "closer",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Transfer Agent",
      dataIndex: "transferAgent",
      key: "transferAgent",
      className: "text-gray-700 font-medium",
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
       <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {/* {isLoading && <p>Loading metrics...</p>} */}
                    {/* {error && <p>Failed to load statistics.</p>} */}
                    { metrics.map((metric, index) => (
                        <MetricCard key={index} {...metric} />
                    ))}
                </div>
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
            dataSource={data}
            pagination={false}
            className="closers-table"
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
            className="closers-pagination"
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

      <style>{`
        .closers-table .ant-table-thead > tr > th {
          background-color: #f9fafb; /* Light gray for header */
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        .closers-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        .closers-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb; /* Light gray on hover */
        }
        .closers-pagination .ant-pagination-item-active {
          background-color: #fbbf24 !important; /* Yellow for active page */
          border-color: #fbbf24 !important;
        }
        .closers-pagination .ant-pagination-item-active a {
          color: #000 !important;
        }
        .closers-pagination .ant-pagination-prev button,
        .closers-pagination .ant-pagination-next button {
          border: 1px solid #d1d5db; /* Gray border for arrows */
          border-radius: 4px;
          background-color: white;
          color: #4b5563;
        }
        .closers-pagination .ant-pagination-prev button:hover,
        .closers-pagination .ant-pagination-next button:hover {
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
