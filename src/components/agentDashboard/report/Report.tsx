"use client"
import { Table, Input, Button, Pagination } from "antd"
import { SearchOutlined, PlusOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import MetricCard from "../../MetricCard/MetricCard"


interface DealRecord {
  key: string
  date: string
  company: string
  clientPolicy: string
  writingAssociate: string
  amount: string
  chargeback: string
  income: string
}

const data: DealRecord[] = Array.from({ length: 10 }, (_, index) => ({
  key: `${index + 1}`,
  date: "12/12/2025",
  company: "Omaha",
  clientPolicy: "BuF5451221",
  writingAssociate: "Emily Carter",
  amount: "$2,21,215",
  chargeback: "$2.21",
  income: "$2,12,111",
}))





const metrics = data ? [
        {
            label: 'Today Orders',
            value: "0", // Static value from the image
            circleColor: '#FF8C38', // Orange color from the image
        },
        {
            label: 'This Month Orders',
            value: '25', // Static value from the image
            circleColor: '#FFD700', // Yellow color from the image
        },
        {
            label: 'This Month Sales',
            value: '30', // Static value from the image
            circleColor: '#000000', // Black color from the image
        },
        // {
        //     label: 'Total Sales',
        //     value: '40', // Static value from the image
        //     circleColor: '#00C4B4', // Teal color from the image
        // },
    ] : [];

export default function ReportPage() {
  const columns: ColumnsType<DealRecord> = [
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
      title: "Client Policy",
      dataIndex: "clientPolicy",
      key: "clientPolicy",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Writing Associate",
      dataIndex: "writingAssociate",
      key: "writingAssociate",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      className: "text-gray-700 font-medium",
    },
    {
      title: "Chargeback",
      dataIndex: "chargeback",
      key: "chargeback",
    className: "chargeback-column-style",
      render: (text: string) => (
        // Wrap text in a div to center it within the cell
        <div className="flex items-center justify-center h-full w-full">{text}</div>
      ),
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
      className: "text-gray-700 font-medium",
    },
  ]



  return (
    <div className=" ">
         <div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {/* {isLoading && <p>Loading metrics...</p>} */}
                    {/* {error && <p>Failed to load statistics.</p>} */}
                    { metrics.map((metric, index) => (
                        <MetricCard key={index} {...metric} />
                    ))}
                </div>
            </div>
      <div className="bg-white rounded-lg shadow-sm mt-4 ">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search by name"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full border-gray-300"
              size="middle"
            />
          </div>

         

          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="rounded-full bg-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 text-black font-medium"
            size="middle"
          >
            Add New Deals
          </Button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="deals-table"
       
            rowClassName="hover:bg-gray-50"
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
            className="deals-pagination"
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

      <style>
        {`
        .deals-table .ant-table-thead > tr > th {
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          padding: 12px 16px;
        }
        
        .deals-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          color: #374151;
        }
        
        .deals-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb;
        }
        
        .deals-pagination .ant-pagination-item-active {
          background-color: #fbbf24;
          border-color: #fbbf24;
        }
        
        .deals-pagination .ant-pagination-item-active a {
          color: #000;
        }
        
        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
          background-color: #fbbf24 !important;
          border-color: #fbbf24 !important;
          color: white !important;
        }
        
        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
          background-color: #f59e0b !important;
          border-color: #f59e0b !important;
        }
         
        /* Custom styling for Total Chargebacks column */
        .deals-table .ant-table-thead .ant-table-cell.chargeback-column-style {
          background-color: #ef4444; /* Tailwind red-500 */
          color: white;
          font-weight: 600;
          text-align: center; /* Center header text */
        }

        .deals-table .ant-table-tbody .ant-table-cell.chargeback-column-style {
          background-color: #ef4444; /* Tailwind red-500 */
          color: white;
          padding: 0; /* Remove default padding to let inner div control it */
        }

        

        `}
      </style>
    </div>
  )
}
