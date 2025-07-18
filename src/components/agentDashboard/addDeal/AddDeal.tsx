"use client"

import type React from "react"
import { useState } from "react"
import { Input, Select, Button } from "antd"

const { Option } = Select
const { TextArea } = Input

export default function AddDeal() {
  // State for form fields
  const [agentName, setAgentName] = useState("")
  const [state, setState] = useState("")
  const [company, setCompany] = useState("")
  const [product, setProduct] = useState("")
  const [clientFirstName, setClientFirstName] = useState("")
  const [clientLastName, setClientLastName] = useState("")
  const [applicationNumber, setApplicationNumber] = useState("")
  const [annualPremiumInput, setAnnualPremiumInput] = useState("")
  const [note, setNote] = useState("")

  // Placeholder data for dropdowns
  const agentNames = ["Emily Carter", "John Doe", "Jane Smith"]
  const states = ["California", "New York", "Texas", "Florida"]
  const companies = ["Xyz", "Abc Corp", "Global Insurers"]
  const products = ["Omaha", "Product A", "Product B"]

  // Dummy calculation values
  const annualPremiumCalculated = "$1,25,580.00"
  const monthlyPremiumCalculated = "$5,80.00"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({
      agentName,
      state,
      company,
      product,
      clientFirstName,
      clientLastName,
      applicationNumber,
      annualPremiumInput,
      note,
    })
    alert("New Deal Created (Check console for data)")
  }

  return (
    <div className=" min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-8xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Form Fields */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Agent Name */}
          <div>
            <label htmlFor="agentName" className="block text-sm font-bold text-gray-800 mb-1">
              Agent Name*
            </label>
            <Select
              id="agentName"
              placeholder="e.g emily carter"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setAgentName(value)}
              value={agentName}
            >
              {agentNames.map((name) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-bold text-gray-800 mb-1">
              State*
            </label>
            <Select
              id="state"
              placeholder="e.g california"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setState(value)}
              value={state}
            >
              {states.map((s) => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </div>

          {/* Select Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-bold text-gray-800 mb-1">
              Select Company*
            </label>
            <Select
              id="company"
              placeholder="Select Company"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setCompany(value)}
              value={company}
            >
              {companies.map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </div>

          {/* Product */}
          <div>
            <label htmlFor="product" className="block text-sm font-bold text-gray-800 mb-1">
              Product*
            </label>
            <Select
              id="product"
              placeholder="Select Product"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setProduct(value)}
              value={product}
            >
              {products.map((p) => (
                <Option key={p} value={p}>
                  {p}
                </Option>
              ))}
            </Select>
          </div>

          {/* Client Name */}
          <div className="col-span-full">
            <label htmlFor="clientFirstName" className="block text-sm font-bold text-gray-800 mb-1">
              Client Name*
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="clientFirstName"
                placeholder="First name"
                size="large"
                className="custom-input"
                value={clientFirstName}
                onChange={(e) => setClientFirstName(e.target.value)}
              />
              <Input
                id="clientLastName"
                placeholder="Last Name"
                size="large"
                className="custom-input"
                value={clientLastName}
                onChange={(e) => setClientLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Application Number */}
          <div className="col-span-full">
            <label htmlFor="applicationNumber" className="block text-sm font-bold text-gray-800 mb-1">
              Application Number*
            </label>
            <Input
              id="applicationNumber"
              placeholder="#Fafl545411"
              size="large"
              className="custom-input"
              value={applicationNumber}
              onChange={(e) => setApplicationNumber(e.target.value)}
            />
          </div>

          {/* Annual Premium */}
          <div className="col-span-full">
            <label htmlFor="annualPremium" className="block text-sm font-bold text-gray-800 mb-1">
              Annual Premium*
            </label>
            <Input
              id="annualPremium"
              placeholder="e.g $12,548"
              size="large"
              className="custom-input"
              value={annualPremiumInput}
              onChange={(e) => setAnnualPremiumInput(e.target.value)}
            />
          </div>

          {/* Note */}
          <div className="col-span-full">
            <label htmlFor="note" className="block text-sm font-bold text-gray-800 mb-1">
              Note*
            </label>
            <TextArea
              id="note"
              placeholder="Say something here"
              rows={4}
              size="large"
              className="custom-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Create New Deal Button */}
          <div className="col-span-full flex justify-start mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black text-white hover:bg-gray-800 border-none rounded-md px-10 py-2 h-auto text-lg font-semibold"
            >
              Create New Deal
            </Button>
          </div>
        </form>

        {/* Right Section: General Info & Calculation */}
        <div className="lg:col-span-1 pl-8 border-l border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">General Info</h3>
          <p className="text-gray-600 text-sm mb-8">
            By clicking ESIGN signature and express written consent for AIRE Insurance Group, Inc. and its partners to
            contact me at the number provided for marketing...
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Calculation</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Annual Premium</span>
            <span className="font-semibold text-gray-800">{annualPremiumCalculated}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Monthly Premium</span>
            <span className="font-semibold text-gray-800">{monthlyPremiumCalculated}</span>
          </div>
        </div>
      </div>

      <style>{`
        .custom-input .ant-input,
        .custom-input .ant-input-affix-wrapper,
        .custom-input .ant-input-textarea {
          background-color: #f0f0f0 !important; /* Light gray background */
          border-color: #f0f0f0 !important; /* Match border to background */
          border-radius: 4px;
          padding: 10px 12px;
        }
        .custom-input .ant-input:hover,
        .custom-input .ant-input-affix-wrapper:hover,
        .custom-input .ant-input-textarea:hover {
          border-color: #d9d9d9 !important; /* Slightly darker gray on hover */
        }
        .custom-input .ant-input:focus,
        .custom-input .ant-input-affix-wrapper-focused,
        .custom-input .ant-input-textarea:focus {
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
