"use client";

import { useState, useEffect } from "react";
import { Modal, Input, Button, Avatar, message, InputNumber } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useUpdateDealMutation } from "../../redux/features/agent/agentApi";
import { toast } from "sonner";

interface AgentProfile {
  name: string;
  avatar: string;
  rank: string;
  rating: number;
}

interface FormData {
  annualPremium: number;
  note: string;
  agentProfile: AgentProfile;
}

interface EditDealRequestModalProps {
  visible: boolean;
  onCancel: () => void;
  initialData?: Partial<FormData> & { id?: string };
  onSave: (updatedData: Partial<FormData>) => void;
}

export default function EditDealRequestModal({
  visible,
  onCancel,
  initialData,
  onSave,
}: EditDealRequestModalProps) {
  const [formData, setFormData] = useState<FormData>({
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
    console.log("🔎 Initial Data:", initialData);
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        annualPremium:
          typeof initialData.annualPremium === "number"
            ? initialData.annualPremium
            : prev.annualPremium,
        note: initialData.note ?? prev.note,
        agentProfile: initialData.agentProfile || prev.agentProfile,
      }));
    }
  }, [initialData]);

  const handleSubmit = async () => {
    try {
      if (!formData.annualPremium) {
        message.error("Annual Premium is required");
        return;
      }

      await updateDeal({
        id: initialData?.id,
        body: {
          annualPremium: Number(formData.annualPremium),
          note: formData.note,
        },
      }).unwrap();

      toast.success("Deal updated successfully");
      onSave({
        annualPremium: Number(formData.annualPremium),
        note: formData.note,
      });
      onCancel();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update deal");
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
        <form className="grid grid-cols-1 gap-y-6">
          {/* Annual Premium Label */}
          <label
            htmlFor="annualPremium"
            className="text-gray-700 font-semibold text-base"
          >
            Annual Premium
          </label>
          {/* Annual Premium Input */}
         <InputNumber
  id="annualPremium"
  name="annualPremium"
  placeholder="Enter Annual Premium"
  value={formData.annualPremium}
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      annualPremium: value || 0,
    }))
  }
  min={0}
  style={{
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    padding: '6px 6px',
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  }}
  onFocus={(e) => {
    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
    e.currentTarget.style.borderColor = '#3B82F6';
  }}
  onBlur={(e) => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = '#D1D5DB';
  }}
/>


          {/* Note Label */}
          <label htmlFor="note" className="text-gray-700 font-semibold text-base">
            Note
          </label>
          {/* Note Input */}
          <Input
            id="note"
            name="note"
            placeholder="Enter note"
            value={formData.note}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, note: e.target.value }))
            }
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Agent Profile Display */}
          <div className="mt-6 flex items-center space-x-4 border-t pt-4">
            <Avatar
              size={56}
              src={formData.agentProfile?.avatar || "/placeholder.svg"}
              alt={formData.agentProfile?.name || "Agent Avatar"}
            />
            <div>
              <div className="font-semibold text-gray-800 text-lg">
                {formData.agentProfile?.name}
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                {[...Array(formData.agentProfile?.rating || 0)].map((_, i) => (
                  <StarFilled
                    key={`filled-${i}`}
                    className="text-yellow-400 text-sm"
                  />
                ))}
                {[...Array(5 - (formData.agentProfile?.rating || 0))].map((_, i) => (
                  <StarFilled
                    key={`empty-${i}`}
                    className="text-gray-300 text-sm"
                  />
                ))}
                <span className="ml-2 text-gray-500">({formData.agentProfile?.rank})</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isLoading}
              className="w-full bg-black text-white text-lg font-semibold rounded-md py-3 hover:bg-gray-900"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
