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

  // NEW STATES
  const [splitWithAgents, setSplitWithAgents] = useState<string[]>([])
  const [showSplitAgents, setShowSplitAgents] = useState(false)

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
      splitWithAgents
    })
    alert("New Deal Created (Check console for data)")
  }

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-8xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label htmlFor="agentName" className="block text-sm font-bold text-gray-800 mb-1">Agent Name*</label>
            <Select
              id="agentName"
              placeholder="e.g emily carter"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setAgentName(value)}
              value={agentName}
            >
              {agentNames.map((name) => (
                <Option key={name} value={name}>{name}</Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-bold text-gray-800 mb-1">State*</label>
            <Select
              id="state"
              placeholder="e.g california"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setState(value)}
              value={state}
            >
              {states.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-bold text-gray-800 mb-1">Select Company*</label>
            <Select
              id="company"
              placeholder="Select Company"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setCompany(value)}
              value={company}
            >
              {companies.map((c) => (
                <Option key={c} value={c}>{c}</Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-bold text-gray-800 mb-1">Product*</label>
            <Select
              id="product"
              placeholder="Select Product"
              className="w-full custom-select"
              size="large"
              onChange={(value) => setProduct(value)}
              value={product}
            >
              {products.map((p) => (
                <Option key={p} value={p}>{p}</Option>
              ))}
            </Select>
          </div>

          <div className="col-span-full">
            <label htmlFor="clientFirstName" className="block text-sm font-bold text-gray-800 mb-1">Client Name*</label>
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

          <div className="col-span-full">
            <label htmlFor="applicationNumber" className="block text-sm font-bold text-gray-800 mb-1">Application Number*</label>
            <Input
              id="applicationNumber"
              placeholder="#Fafl545411"
              size="large"
              className="custom-input"
              value={applicationNumber}
              onChange={(e) => setApplicationNumber(e.target.value)}
            />
          </div>

          <div className="col-span-full">
            <label htmlFor="annualPremium" className="block text-sm font-bold text-gray-800 mb-1">Annual Premium*</label>
            <Input
              id="annualPremium"
              placeholder="e.g $12,548"
              size="large"
              className="custom-input"
              value={annualPremiumInput}
              onChange={(e) => setAnnualPremiumInput(e.target.value)}
            />
          </div>

          <div className="col-span-full">
            <label htmlFor="note" className="block text-sm font-bold text-gray-800 mb-1">Note*</label>
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

          <div className="col-span-full flex justify-start mt-6">
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "10px 40px",
                fontSize: "1.125rem",
                fontWeight: 600,
                height: "auto",
                transition: "background 0.2s",
              }}
              onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#222"}
              onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#000"}
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
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700">Monthly Premium</span>
            <span className="font-semibold text-gray-800">{monthlyPremiumCalculated}</span>
          </div>

          {/* Split With Section */}
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-800 block mb-1">Split With</label>
            <div className="flex items-start gap-2">
              <Button
                type="default"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "6px",
                  padding: "0 12px",
                  fontWeight: "bold",
                }}
                onClick={() => setShowSplitAgents(true)}
              >
                +
              </Button>
              {showSplitAgents && (
                <Select
                  mode="multiple"
                  placeholder="Select agents"
                  className="w-full custom-select"
                  size="large"
                  onChange={(value) => setSplitWithAgents(value)}
                  value={splitWithAgents}
                >
                  {agentNames.map((name) => (
                    <Option key={name} value={name}>{name}</Option>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-input .ant-input,
        .custom-input .ant-input-affix-wrapper,
        .custom-input .ant-input-textarea {
          background-color: #f0f0f0 !important;
          border-color: #f0f0f0 !important;
          border-radius: 4px;
          padding: 10px 12px;
        }
        .custom-input .ant-input:hover,
        .custom-input .ant-input-affix-wrapper:hover,
        .custom-input .ant-input-textarea:hover {
          border-color: #d9d9d9 !important;
        }
        .custom-input .ant-input:focus,
        .custom-input .ant-input-affix-wrapper-focused,
        .custom-input .ant-input-textarea:focus {
          border-color: #d9d9d9 !important;
          box-shadow: none !important;
        }

        .custom-select .ant-select-selector {
          background-color: #f0f0f0 !important;
          border-color: #f0f0f0 !important;
          border-radius: 4px;
          padding: 6px 12px;
          height: auto !important;
        }
        .custom-select .ant-select-arrow {
          color: #6b7280;
        }
        .custom-select .ant-select-selector:hover {
          border-color: #d9d9d9 !important;
        }
        .custom-select.ant-select-focused .ant-select-selector {
          border-color: #d9d9d9 !important;
          box-shadow: none !important;
        }
        .custom-select .ant-select-selection-placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  )
}
