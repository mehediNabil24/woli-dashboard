/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { Input, Select, Button } from "antd"

const { Option } = Select
const { TextArea } = Input
import './addDeal.css'
import { useGetCompanyQuery, } from "../../../redux/features/product/productApi"
import { useAddDealsMutation, useGetProductQueryQuery } from "../../../redux/features/deals/dealsApi"
import { toast } from "sonner"
export default function AddDeal() {
  // State for form fields

  const [state, setState] = useState("")
  const [company, setCompany] = useState("")
  const [product, setProduct] = useState("")
  const [clientFirstName, setClientFirstName] = useState("")
  const [clientLastName, setClientLastName] = useState("")
  const [applicationNumber, setApplicationNumber] = useState("")
  const [annualPremiumInput, setAnnualPremiumInput] = useState("")
  const [note, setNote] = useState("")
  // api 
  const { data } = useGetCompanyQuery({ page: 1, limit: 10 })
  const companies = data?.data || [];
  const [addDeals, { isLoading }] = useAddDealsMutation()
  const { data: productsData } = useGetProductQueryQuery(company)

  // Dummy calculation values

  const annualPremiumNumber = Number(annualPremiumInput.replace(/[^0-9]/g, ""));
  const monthlyPremiumCalculated = annualPremiumNumber / 12;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !product ||
      !company ||
      !state ||
      !clientFirstName ||
      !clientLastName ||
      !applicationNumber ||
      !annualPremiumNumber
    ) {
      let missingField = "";

      if (!product) missingField = "product";
      else if (!company) missingField = "company";
      else if (!state) missingField = "state";
      else if (!clientFirstName) missingField = "client first name";
      else if (!clientLastName) missingField = "client last name";
      else if (!applicationNumber) missingField = "application number";
      else if (!annualPremiumNumber) missingField = "annual premium";

      toast.error(`Please provide ${missingField} and fill in all required fields.`);
      return;
    }

    try {
      const dealsData = {
        state,
        companyId: company,
        productId: product,
        clientFirstName,
        clientLastName,
        applicationNumber,
        annualPremium: parseFloat(annualPremiumNumber.toString()),
        dealDate: new Date().toISOString(),
        note
      };

      const res = await addDeals(dealsData).unwrap();
      if (res.success) {
        toast.success(res.message)
        setState("");
        setCompany("");
        setProduct("");
        setClientFirstName("");
        setClientLastName("");
        setApplicationNumber("");
        setAnnualPremiumInput("");
        setNote("");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };





  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-8xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* <div>
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
          </div> */}

          <div>
            <label htmlFor="state" className="block text-sm font-bold text-gray-800 mb-1">State*</label>
            <Input
              id="state"
              placeholder="State"
              size="large"
              className="custom-input"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-bold text-black mb-1">Select Company*</label>
            <Select
              id="company"
              placeholder="Select Company"
              className="w-full custom-select"
              size="large"
              onChange={(id) => setCompany(id)}
              value={company ?? undefined}
            >
              {companies.map((c: any) => (
                <Option key={c.id} value={c.id}>
                  {c.companyName}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="product" className="block text-sm font-bold text-black mb-1">
              Product*
            </label>
            <Select
              id="product"
              placeholder="Select Product"
              size="large"
              className="custom-select w-full" // Full width
              onChange={(id) => setProduct(id)}
              value={product || undefined}
              style={{ width: "100%" }} // Backup full width style

            >
              {productsData?.data?.map((p: any) => (
                <Option key={p.id} value={p.id}>
                  {p.productName}
                </Option>
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

              {
                isLoading ? "Creating..." : "Create New Deal"
              }
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
            <span className="font-semibold text-gray-800">${annualPremiumInput}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700">Monthly Premium</span>
            <span className="font-semibold text-gray-800">${monthlyPremiumCalculated}</span>
          </div>

          {/* Split With Section */}
          {/* <div className="mb-4">
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
          </div> */}
        </div>
      </div>

    </div>
  )
}


