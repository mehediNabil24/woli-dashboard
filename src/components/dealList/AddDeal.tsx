"use client"

import type React from "react"
import { useState } from "react"
import { Input, Select, Button, message, Spin } from "antd"
import { useAddCompanyMutation, useAddProductMutation, useGetCompanyQuery } from "../../redux/features/product/productApi"
import { toast } from "sonner"

const { Option } = Select

export default function AddDealPage() {
  const [newCompanyName, setNewCompanyName] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(undefined)
  const [productName, setProductName] = useState("")
  const [applicationNumber, setApplicationNumber] = useState("")

  // API hooks
  const { data, isLoading: loadingCompanies, refetch } = useGetCompanyQuery({})
  const companiesData = data?.data || []
  const [addCompany] = useAddCompanyMutation()
  const [addProduct] = useAddProductMutation()

  const handleAddCompany = async () => {
    if (!newCompanyName.trim()) {
      message.error("Company name cannot be empty.")
      return
    }

    try {
      const res = await addCompany({ companyName: newCompanyName }).unwrap()
      if (res?.success) {
        toast.success(res?.message || `Company "${newCompanyName}" added successfully!`)
        setNewCompanyName("")
        await refetch() // Refresh company list

        // ✅ Auto-select the newly added company
        if (res?.data?.id) {
          setSelectedCompany(res.data.id) // Keep as string
        }
      } else {
        message.error(res?.message || "Failed to add company.")
      }
    } catch (error: any) {
      const backendMsg = error?.data?.message
      toast.error(backendMsg || "Failed to add company.")
    }
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCompany || !productName.trim()) {
      message.error("Please fill in required fields.")
      return
    }

    try {
      const res = await addProduct({
        companyId: selectedCompany, // ✅ Keep as string
        productName,
        applicationNumber,
      }).unwrap()

      if (res?.success) {
        toast.success(res?.message || "Product details submitted successfully!")
        setSelectedCompany(undefined)
        setProductName("")
        setApplicationNumber("")
      } else {
        toast.error(res?.message || "Failed to add product.")
      }
    } catch (error: any) {
      const backendMsg = error?.data?.message
      message.error(backendMsg || "Failed to add product.")
    }
  }

  return (
    <div className="p-4 min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg p-8 w-full max-w-8xl">
        {/* Add Company Section */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Company*</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Input
              placeholder="e.g. Apple Inc."
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
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#000")}
            >
              Add Company
            </Button>
          </div>
        </div>

        {/* Add Products Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add Products</h2>
          <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Company Dropdown */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Company*</label>
              {loadingCompanies ? (
                <Spin />
              ) : (
                <Select
                  placeholder="Select Company"
                  className="w-full custom-select"
                  size="large"
                  onChange={(value) => setSelectedCompany(value)}
                  value={selectedCompany}
                >
                  {companiesData?.map((company: any) => (
                    <Option key={company.id} value={company.id}>
                      {company.companyName}
                    </Option>
                  ))}
                </Select>
              )}
            </div>

            {/* Product */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Product*</label>
              <Input
                placeholder="e.g. Apple Watch Series 10"
                size="large"
                className="custom-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* Application Number */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Application Number</label>
              <Input
                placeholder="#AP-AW10-003"
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
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#000")}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
