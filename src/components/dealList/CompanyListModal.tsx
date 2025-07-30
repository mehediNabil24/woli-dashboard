"use client";


import { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import { useUpdateCompanyMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";


interface EditCompanyModalProps {
  visible: boolean;
  onCancel: () => void;
  initialData?: {
    id?: string; // ✅ Added ID for updating
    companyName: string;
  };
  onSave: (data: { companyName: string }) => void;
}

export default function EditCompanyModal({
  visible,
  onCancel,
  initialData,
  onSave,
}: EditCompanyModalProps) {
  const [companyName, setCompanyName] = useState(initialData?.companyName || "");

  // ✅ RTK Query mutation hook
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  useEffect(() => {
    setCompanyName(initialData?.companyName || "");
  }, [initialData]);

  const handleSave = async () => {
  if (!companyName.trim()) {
    message.warning("Company name cannot be empty");
    return;
  }

  try {
    const response = await updateCompany({
      id: initialData?.id,
      body: { companyName: companyName.trim() },
    }).unwrap();

    // ✅ Use backend success message
    toast.success(response?.message || "Company updated successfully");

    onSave({ companyName: companyName.trim() });
    onCancel();
  } catch (error: any) {
    // ✅ Extract backend error message
    const errorMsg =
      error?.data?.message ||
      error?.error ||
      "Failed to update company";
    toast.error(errorMsg);

    console.error("Update error:", error);
  }
};



  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
      centered
      destroyOnClose
      className="edit-company-modal"
    >
      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="companyName" className="block text-base font-medium text-gray-900 mb-3">
            Company Name
          </label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            size="large"
            className="custom-input-underline"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            bordered={false}
          />
        </div>

        <Button
          type="primary"
          loading={isLoading}
          onClick={handleSave}
          className="bg-black text-white hover:bg-gray-800 border-none rounded-md px-10 py-3 h-auto text-base font-medium w-full"
        >
          Save
        </Button>
      </div>

      <style>{`
        .edit-company-modal .ant-modal-content {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .edit-company-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }
        .edit-company-modal .custom-input-underline.ant-input-borderless {
          border-bottom: 1px solid #d1d5db !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          box-shadow: none !important;
          font-size: 16px !important;
        }
        .edit-company-modal .custom-input-underline.ant-input-borderless:hover {
          border-bottom-color: #9ca3af !important;
        }
        .edit-company-modal .custom-input-underline.ant-input-borderless:focus {
          border-bottom-color: #374151 !important;
        }
        .edit-company-modal .custom-input-underline.ant-input-borderless::placeholder {
          color: #9ca3af !important;
        }
      `}</style>
    </Modal>
  );
}
