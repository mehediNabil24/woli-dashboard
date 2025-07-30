/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal, Input, Select, Button } from "antd";
import {  useState } from "react";
import { useUpdateDealsMutation } from "../../../redux/features/deals/dealsApi";
import { toast } from "sonner";

const { TextArea } = Input;


export default function EditDealModal({
  visible,
  onCancel,
  initialData,
}: any) {
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
    // if (!initialData?.key) {
    //   toast.error("No deal selected for update");
    //   return;
    // }

    // try {
    //   const res = await updateDeal({
    //     id: initialData.key,
    //     data: formData,
    //   }).unwrap();

    //   if (res?.success) {
    //     toast.success(res?.message || "Deal updated successfully");
    //     onCancel(); // modal close
    //   } else {
    //     toast.error(res?.message || "Update failed");
    //   }
    // } catch (error: any) {
    //   toast.error(error?.data?.message || "Something went wrong");
    // }
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
        <form onSubmit={handleSubmit}>
      </div>
    </Modal>
  );
}
