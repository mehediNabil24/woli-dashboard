"use client"

import type React from "react"
import { useState } from "react"
import { Input, Select, Button, message } from "antd"

const { Option } = Select

export default function AddDealPage() {
  const [newCompanyName, setNewCompanyName] = useState("")
  const [companies, setCompanies] = useState<string[]>(["Company A", "Company B", "Company C"]) // Initial dummy companies

  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(undefined)
  const [productName, setProductName] = useState("")
  const [commissions, setCommissions] = useState("")
  const [applicationNumber, setApplicationNumber] = useState("")

  const handleAddCompany = () => {
    if (newCompanyName.trim() && !companies.includes(newCompanyName.trim())) {
      setCompanies((prev) => [...prev, newCompanyName.trim()])
      setNewCompanyName("")
      message.success(`Company "${newCompanyName.trim()}" added successfully!`)
    } else if (companies.includes(newCompanyName.trim())) {
      message.warning(`Company "${newCompanyName.trim()}" already exists.`)
    } else {
      message.error("Company name cannot be empty.")
    }
  }

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCompany || !productName.trim() || !commissions.trim()) {
      message.error("Please fill in all required fields for Add Products.")
      return
    }
    console.log({
      company: selectedCompany,
      product: productName,
      commissions: commissions,
      applicationNumber: applicationNumber,
    })
    message.success("Product details submitted successfully!")
    // Reset product form fields
    setSelectedCompany(undefined)
    setProductName("")
    setCommissions("")
    setApplicationNumber("")
  }

  return (
    <div className="p-4  min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg p-8 w-full max-w-8xl">
        {/* Add Company Section */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Company*</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Input
              placeholder="e.g. Emily Carter"
              size="large"
              className="custom-input"
              style={{ flex: 1 }}
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
            <Button
              type="primary"
              onClick={handleAddCompany}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 24px",
                fontWeight: 600,
                height: "auto",
              }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "#1f2937")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "#000")}
            >
              Add Company
            </Button>
          </div>
        </div>
dsadasdsad
        {/* Add Products Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add Products</h2>
          <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Company Dropdown */}
            <div>
              <label htmlFor="productCompany" className="block text-sm font-bold text-gray-800 mb-1">
                Company*
              </label>
              <Select
                id="productCompany"
                placeholder="e.g. Emily Carter"
                className="w-full custom-select"
                size="large"
                onChange={(value) => setSelectedCompany(value)}
                value={selectedCompany}
              >
                {companies.map((company) => (
                  <Option key={company} value={company}>
                    {company}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Product */}
            <div>
              <label htmlFor="productName" className="block text-sm font-bold text-gray-800 mb-1">
                Product*
              </label>
              <Input
                id="productName"
                placeholder="e.g. Omahan"
                size="large"
                className="custom-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* Commissions % */}
            <div>
              <label htmlFor="commissions" className="block text-sm font-bold text-gray-800 mb-1">
                Commissions %*
              </label>
              <Input
                id="commissions"
                placeholder="e.g. 20%"
                size="large"
                className="custom-input"
                value={commissions}
                onChange={(e) => setCommissions(e.target.value)}
              />
            </div>

            {/* Application Number */}
            <div>
              <label htmlFor="applicationNumber" className="block text-sm font-bold text-gray-800 mb-1">
                Application Number
              </label>
              <Input
                id="applicationNumber"
                placeholder="#Fda121511"
                size="large"
                className="custom-input"
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-full flex justify-start mt-6">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 24px",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "auto",
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "#1f2937")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "#000")}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
      .custom-input .ant-input,
      .custom-input .ant-input-affix-wrapper {
        background-color: #f0f0f0 !important; /* Light gray background */
        border-color: #f0f0f0 !important; /* Match border to background */
        border-radius: 4px;
        padding: 10px 12px;
      }
      .custom-input .ant-input:hover,
      .custom-input .ant-input-affix-wrapper:hover {
        border-color: #d9d9d9 !important; /* Slightly darker gray on hover */
      }
      .custom-input .ant-input:focus,
      .custom-input .ant-input-affix-wrapper-focused {
        border-color: #d9d9d9 !important; /* Keep border consistent on focus */
        box-shadow: none !important; /* Remove default Ant Design blue shadow */
      }

      .custom-select .ant-select-selector {
        background-color: #f0f0f0 !important; /* Light gray background */
        border-color: #f0f0f0 !important; /* Match border to background */
        border-radius: 4px;
        padding: 6px 12px; /* Adjust padding for select */
        height: auto !important; /* Allow height to adjust based on content */
      }
      .custom-select .ant-select-arrow {
        color: #6b7280; /* Darker arrow color */
      }
      .custom-select .ant-select-selector:hover {
        border-color: #d9d9d9 !important; /* Slightly darker gray on hover */
      }
      .custom-select.ant-select-focused .ant-select-selector {
        border-color: #d9d9d9 !important; /* Keep border consistent on focus */
        box-shadow: none !important; /* Remove default Ant Design blue shadow */
      }
      .custom-select .ant-select-selection-placeholder {
        color: #9ca3af; /* Placeholder text color */
      }
    `}</style>
    </div>
  )
}
