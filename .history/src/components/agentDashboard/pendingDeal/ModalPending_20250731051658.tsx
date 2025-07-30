/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useUpdateDealsMutation } from "../../../redux/features/deals/dealsApi";
import { toast } from "sonner";

const { TextArea } = Input;

interface EditDealModalProps {
  visible: boolean;
  onCancel: () => void;
  initialData?: {
    key: string;
    state: string;
    company: string;
    product: string;
    clientFirstName: string;
    clientLastName: string;
    applicationNumber: string;
    applicationNo: string;
    note: string;
    annualPremi: string;
  };
}

export default function EditDealModal({
  visible,
  onCancel,
  initialData,
}: EditDealModalProps) {
  const [formData, setFormData] = useState({
    state: "",
    company: "",
    product: "",
    clientFirstName: "",
    clientLastName: "",
    applicationNumber: "",
    annualPremium: "",
    note: "",
  });

  console.log(initialData, "initialData");

  const [updateDeal, { isLoading }] = useUpdateDealsMutation();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!initialData?.key) {
      toast.error("No deal selected for update");
      return;
    }

    try {
      const res = await updateDeal({
        id: initialData.key,
        data: formData,
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Deal updated successfully");
        onCancel(); // modal close
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
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* State */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            State*
          </label>
          <Select
            value={initialData?.state}
            onChange={(val) => handleChange("state", val)}
            className="w-full"
            size="large"
          >
            <Select.Option value="California">California</Select.Option>
            <Select.Option value="New York">New York</Select.Option>
          </Select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Select Company*
          </label>
          <Select
            value={initialData?.company}
            onChange={(val) => handleChange("company", val)}
            className="w-full"
            size="large"
          >
            <Select.Option value="Xyz">Xyz</Select.Option>
            <Select.Option value="Abc">Abc</Select.Option>
          </Select>
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Product*
          </label>
          <Select
            value={initialData?.product}
            onChange={(val) => handleChange("product", val)}
            className="w-full"
            size="large"
          >
            <Select.Option value="Omaha">Omaha</Select.Option>
            <Select.Option value="Product B">Product B</Select.Option>
          </Select>
        </div>

        {/* Client Name */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Client Name*
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={initialData?.clientFirstName}
              onChange={(e) =>
                handleChange("clientFirstName", e.target.value)
              }
              placeholder="First Name"
              size="large"
            />
            <Input
              value={initialData?.clientLastName}
              onChange={(e) =>
                handleChange("clientLastName", e.target.value)
              }
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
            value={initialData?.applicationNo}
            onChange={(e) =>
              handleChange("applicationNumber", e.target.value)
            }
            size="large"
          />
        </div>

        {/* Annual Premium */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Annual Premium*
          </label>
          <Input
            value={initialData?.annualPremi}
            onChange={(e) =>
              handleChange("annualPremium", e.target.value)
            }
            size="large"
          />
        </div>

        {/* Note */}
        <div className="col-span-full">
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Note*
          </label>
          <TextArea
            value={initialData?.note}
            onChange={(e) => handleChange("note", e.target.value)}
            rows={4}
            size="large"
          />
        </div>

        {/* Update Button */}
        <div className="col-span-full flex justify-center mt-6">
          <Button
            htmlType="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
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
      </div>
    </Modal>
  );
}
