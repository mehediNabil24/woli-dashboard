"use client";

import { Avatar, Select, Button, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddAgentLevelMutation, useAddAgentStatusMutation, useGetAgentByIdQuery } from "../../redux/features/agent/agentApi";
import { useGetLevelQuery } from "../../redux/features/level/levelApi";
import { toast } from "sonner";



const { Option } = Select;

export default function AgentDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, refetch } = useGetAgentByIdQuery(id);
  const agent = data?.data;
  console.log("Agent Data:", agent);

  const [currentStatus, setCurrentStatus] = useState<string | undefined>(undefined);
  const [currentLevel, setCurrentLevel] = useState<string | undefined>(undefined);

  // ✅ Mutations
  const [updateUserStatus] = useAddAgentStatusMutation();
  const { data: levelData } = useGetLevelQuery({});
  const [addLevel] = useAddAgentLevelMutation();

  useEffect(() => {
    if (agent) {
      setCurrentStatus(agent.approvalStatus);
      setCurrentLevel(agent.level?.id || "No Level");
    }
  }, [agent]);

  // ✅ Handle status update
  const handleStatusChange = async (value: string) => {
    setCurrentStatus(value);
    try {
      const response = await updateUserStatus({
        userId: agent.id,
        status: value,
      }).unwrap();
      toast.success(response?.message || "Status updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  // ✅ Handle level update
  const handleLevelChange = async (levelId: string) => {
    setCurrentLevel(levelId);
    try {
      const response = await addLevel({
        userId: agent.id,
        levelId: levelId,
      }).unwrap();
      toast.success(response?.message || "Level updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update level");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        &larr; Back to Agent List
      </button>
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Agent Info */}
        <div className="border border-yellow-300 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center space-x-4 md:col-span-1">
            <Avatar size={80} src={agent.profile?.imageUrl || "/placeholder.svg"} />
            <div>
              <div className="text-sm text-gray-600">Name</div>
              <div className="text-lg font-semibold text-gray-800">
                {agent.profile?.firstName} {agent.profile?.lastName}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mb-2">
              <div className="text-sm text-gray-600">Contact number</div>
              <div className="font-semibold text-gray-800">{agent.profile?.phone || "N/A"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Date of birth</div>
              <div className="font-semibold text-gray-800">{agent.profile?.dateOfBirth || "N/A"}</div>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col items-start md:items-end">
            <div className="mb-2">
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-semibold text-gray-800">{agent.email}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">Status</div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  agent.approvalStatus === "APPROVED"
                    ? "bg-green-100 text-green-800"
                    : agent.approvalStatus === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {agent.approvalStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Status & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Status</h3>
            <Select
              value={currentStatus}
              onChange={handleStatusChange}
              className="w-full custom-select-yellow"
              size="large"
            >
              <Option value="APPROVED">Approved</Option>
              <Option value="PENDING">Pending</Option>
              <Option value="REJECTED">Rejected</Option>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Agent Level</h3>
            <Select
              value={currentLevel}
              onChange={handleLevelChange}
              className="w-full custom-select-yellow"
              size="large"
            >
              {levelData?.data?.map((level: any) => (
                <Option key={level.id} value={level.id}>
                  {level.levelName}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Uploaded Documents</h3>
          {agent.userDocuments.length === 0 ? (
            <div className="text-gray-500">No documents uploaded.</div>
          ) : (
            <div className="space-y-4">
              {agent.userDocuments.map((doc: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 rounded-md p-4"
                >
                  <span className="text-gray-700">{doc.documentUrl}</span>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    className="bg-yellow-400 text-black hover:bg-yellow-500 border-none rounded-md px-4 py-2 h-auto font-semibold"
                    href={doc.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-select-yellow .ant-select-selector {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2) !important;
        }
        .custom-select-yellow .ant-select-arrow {
          color: #fbbf24 !important;
        }
      `}</style>
    </div>
  );
}
