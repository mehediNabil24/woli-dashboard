"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Modal, Input, Button, Avatar, message } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useUpdateDealMutation } from "../../redux/features/agent/agentApi";

interface AgentProfile {
  name: string;
  avatar: string;
  rank: string;
  rating: number;
}

interface FormData {
  state: string;
  companyId: string;
  productId: string;
  clientFirstName: string;
  clientLastName: string;
  applicationNumber: string;
  annualPremium: number;
  note: string;
  agentProfile: AgentProfile;
}

interface EditDealRequestModalProps {
  visible: boolean;
  onCancel: () => void;
  initialData?: Partial<FormData> & { id?: string };
  onSave: (updatedData: Partial<FormData>) => void; // ✅ Updated
}

export default function EditDealRequestModal({
  visible,
  onCancel,
  initialData,
  onSave,
}: EditDealRequestModalProps) {
  const [formData, setFormData] = useState<FormData>({
    state: "",
    companyId: "",
    productId: "",
    clientFirstName: "",
    clientLastName: "",
    applicationNumber: "",
    annualPremium: 0,
    note: "",
    agentProfile: {
      name: "",
      avatar: "",
      rank: "",
      rating: 0,
    },
  });

  const [updateDeal, { isLoading }] = useUpdateDealMutation();

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        agentProfile: initialData.agentProfile || prev.agentProfile,
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateDeal({
        id: initialData?.id,
        body: {
          state: formData.state,
          companyId: formData.companyId,
          productId: formData.productId,
          clientFirstName: formData.clientFirstName,
          clientLastName: formData.clientLastName,
          applicationNumber: formData.applicationNumber,
          annualPremium: formData.annualPremium,
          note: formData.note,
        },
      }).unwrap();

      message.success("Deal updated successfully");
      onSave(formData); // ✅ Send updated data to parent
      onCancel();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update deal");
    }
  };

  return (
    <Modal
      title="Edit Deal"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
      destroyOnClose
      className="edit-deal-request-modal"
    >
      <div className="p-6">
        <form className="grid grid-cols-1 gap-y-4">
          <Input
            name="annualPremium"
            placeholder="Annual Premium"
            value={formData.annualPremium}
            onChange={handleChange}
          />
          <Input name="note" placeholder="Note" value={formData.note} onChange={handleChange} />

          {/* Agent Profile */}
          <div className="mt-4 flex items-center space-x-3">
            <Avatar size={48} src={formData.agentProfile?.avatar || "/placeholder.svg"} />
            <div>
              <div className="font-semibold text-gray-800">{formData.agentProfile?.name}</div>
              <div className="flex items-center text-sm text-gray-600">
                {[...Array(formData.agentProfile?.rating || 0)].map((_, i) => (
                  <StarFilled key={i} className="text-yellow-400 text-xs" />
                ))}
                {[...Array(5 - (formData.agentProfile?.rating || 0))].map((_, i) => (
                  <StarFilled key={i} className="text-gray-300 text-xs" />
                ))}
                <span className="ml-1">({formData.agentProfile?.rank})</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isLoading}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "4px 10px",
                height: "auto",
                fontSize: "18px",
                fontWeight: 600,
                width: "100%",
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
