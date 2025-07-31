/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useGetProductQueryQuery, useUpdateDealsMutation } from "../../../redux/features/deals/dealsApi";
import { useGetCompanyQuery } from "../../../redux/features/product/productApi";
import { toast } from "sonner";

const { TextArea, Option } = Input;
const { Option: SelectOption } = Select;

export default function EditDealModal({
  visible,
  onCancel,
  initialData,
}: any) {
  const [formData, setFormData] = useState({
    state: "",
    companyId: "",
    productId: "",
    clientFirstName: "",
    clientLastName: "",
    applicationNumber: "",
    annualPremium: "",
    note: "",
  });

  const [updateDeal, { isLoading }] = useUpdateDealsMutation();

  // Fetch company list
  const { data: companyData } = useGetCompanyQuery({ page: 1, limit: 50 });
  const companies = companyData?.data || [];

  // Fetch product list for selected company
  const { data: productsData } = useGetProductQueryQuery(formData.companyId);
  const products = productsData?.data || [];

  // Load initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        state: initialData.state || "",
        companyId: initialData.companyId || "",
        productId: initialData.productId || "",
        clientFirstName: initialData.clientFirstName || "",
        clientLastName: initialData.clientLastName || "",
        applicationNumber: initialData.applicationNo || "",
        annualPremium: initialData.annualPremium ? String(initialData.annualPremium) : "",
        note: initialData.note || "",
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();

    if (!initialData?.key) {
      toast.error("No deal selected for update");
      return;
    }

    try {
      const res = await updateDeal({
        id: initialData.key,
        data: {
          state: formData.state,
          company: { connect: { id: formData.companyId } }, // ✅ Prisma relation
          product: { connect: { id: formData.productId } }, // ✅ Prisma relation
          clientFirstName: formData.clientFirstName,
          clientLastName: formData.clientLastName,
          applicationNumber: formData.applicationNumber,
          annualPremium: parseFloat(formData.annualPremium || "0"), // ✅ Convert to Float
          note: formData.note,
        },
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Deal updated successfully");
        onCancel(); // Close modal
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      title={
        <div className="text-center text-2xl font-bold uppercase pb-2 border-b-2 border-black inline-block">
          EDIT DEALS
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
      destroyOnClose
      className="edit-deal-modal"
    >
      <form
        onSubmit={handleSubmit}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        {/* State */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            State*
          </label>
          <Select
            value={formData.state}
            onChange={(val) => handleChange("state", val)}
            className="w-full"
            size="large"
          >
            <SelectOption value="California">California</SelectOption>
            <SelectOption value="New York">New York</SelectOption>
          </Select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Select Company*
          </label>
          <Select
            placeholder="Select Company"
            className="w-full"
            size="large"
            onChange={(id) => handleChange("companyId", id)}
            value={formData.companyId || undefined}
          >
            {companies.map((c: any) => (
              <SelectOption key={c.id} value={c.id}>
                {c.companyName}
              </SelectOption>
            ))}
          </Select>
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Product*
          </label>
          <Select
            placeholder="Select Product"
            size="large"
            className="w-full"
            onChange={(id) => handleChange("productId", id)}
            value={formData.productId || undefined}
          >
            {products.map((p: any) => (
              <SelectOption key={p.id} value={p.id}>
                {p.productName}
              </SelectOption>
            ))}
          </Select>
        </div>

        {/* Client Name */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Client Name*
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={formData.clientFirstName}
              onChange={(e) => handleChange("clientFirstName", e.target.value)}
              placeholder="First Name"
              size="large"
            />
            <Input
              value={formData.clientLastName}
              onChange={(e) => handleChange("clientLastName", e.target.value)}
              placeholder="Last Name"
              size="large"
            />
          </div>
        </div>

        {/* Application Number */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Application Number*
          </label>
          <Input
            value={formData.applicationNumber}
            onChange={(e) => handleChange("applicationNumber", e.target.value)}
            size="large"
          />
        </div>

        {/* Annual Premium */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Annual Premium*
          </label>
          <Input
            type="number"
            value={formData.annualPremium}
            onChange={(e) => handleChange("annualPremium", e.target.value)}
            size="large"
          />
        </div>

        {/* Note */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Note*
          </label>
          <TextArea
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            rows={4}
            size="large"
          />
        </div>

        {/* Update Button */}
        <div className="col-span-full flex justify-center mt-6">
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "12px 40px",
              fontSize: "18px",
              fontWeight: 600,
              height: "auto",
            }}
          >
            Update Now
          </Button>
        </div>
      </form>
    </Modal>
  );
}
