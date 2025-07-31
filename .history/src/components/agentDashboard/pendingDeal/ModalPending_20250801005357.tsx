/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useGetProductQueryQuery, useUpdateDealsMutation } from "../../../redux/features/deals/dealsApi";
import { toast } from "sonner";
import { useGetCompanyQuery } from "../../../redux/features/product/productApi";

const { TextArea } = Input;
const { Option } = Select;

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
console.log(initialData?.company, "initialData");
  const [updateDeal, { isLoading }] = useUpdateDealsMutation();
  const { data } = useGetCompanyQuery({ page: 1, limit: 10 });
  const companies = data?.data || [];

  const { data: productsData } = useGetProductQueryQuery(formData.companyId);
  const products = productsData?.data || [];

  // Pre-fill form when modal opens
 useEffect(() => {
  if (initialData) {
    setFormData({
      state: initialData.state || "",
      companyId: initialData.company?.id || "", // must be valid ObjectID
      productId: initialData.product?.id || "",
      clientFirstName: initialData.clientFirstName || "",
      clientLastName: initialData.clientLastName || "",
      applicationNumber: initialData.applicationNumber || "",
      annualPremium: initialData.annualPremium || "",
      note: initialData.note || "",
    });
  }
}, [initialData]);


  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "annualPremium" ? Number(value) : value,
    }));
  };

 const handleSubmit = async (e?: any) => {
  if (e) e.preventDefault();

  if (!initialData?.key) {
    toast.error("No deal selected for update");
    return;
  }

  if (!formData.companyId) {
    toast.error("Please select a company");
    return;
  }

  if (!formData.productId) {
    toast.error("Please select a product");
    return;
  }

  try {
    const res = await updateDeal({
      id: initialData.key,
      data: {
        ...formData,
        annualPremium: Number(formData.annualPremium) || 0, // ensure number
      },
    }).unwrap();

    if (res?.success) {
      toast.success(res?.message || "Deal updated successfully");
      onCancel();
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
            State
          </label>
          <Input
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="State"
            size="large"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Select Company
          </label>
          <Select
            placeholder="Select Company"
            className="w-full custom-select"
            size="large"
            onChange={(id) => handleChange("companyId", id)}
            defaultValue={initialData?.company}
            value={formData.companyId || undefined}
          >
            {/* Ensure current company is in list */}
            {[...(formData.companyId && !companies.some((c:any) => c.id === formData.companyId)
              ? [{ id: formData.companyId, companyName: initialData?.companyName }]
              : []), ...companies].map((c: any) => (
              <Option key={c.id} value={c.id}>
                {c.companyName}
              </Option>
            ))}
          </Select>
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Product
          </label>
          <Select
            placeholder="Select Product"
            size="large"
            className="custom-select w-full"
            onChange={(id) => handleChange("productId", id)}
            // defaultValue={initialData?.product}
            value={formData.productId || undefined}
          >
            {[...(formData.productId && !products.some((p:any) => p.id === formData.productId)
              ? [{ id: formData.productId, productName: initialData?.productName }]
              : []), ...products].map((p: any) => (
              <Option key={p.id} value={p.id}>
                {p.productName}
              </Option>
            ))}
          </Select>
        </div>

        {/* Client Name */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Client Name
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
            Application Number
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
            Annual Premium
          </label>
          <Input
            value={formData.annualPremium}
            onChange={(e) => handleChange("annualPremium", Number(e.target.value))}
            size="large"
          />
        </div>

        {/* Note */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Note
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
