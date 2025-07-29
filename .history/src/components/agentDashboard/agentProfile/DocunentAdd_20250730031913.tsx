/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DeleteOutlined,
  PaperClipOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps, message } from "antd";
import { useState, useEffect } from "react";
import { useAddDocumentMutation } from "../../../redux/features/profile/profileApi";

const DocumentAdd = ({ documentAgent }:any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addDocument, { isLoading }] = useAddDocumentMutation();

  // ✅ Map documentAgent array to UploadFile format
  useEffect(() => {
    if (documentAgent?.length) {
      const mappedFiles: UploadFile[] = documentAgent.map((doc) => ({
        uid: doc.id,
        name: doc.documentUrl.split("/").pop() || "document",
        status: "done",
        url: doc.documentUrl,
        type: doc.documentType,
      }));
      setFileList(mappedFiles);
    }
  }, [documentAgent]);

  const handleFileRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const uploadProps: UploadProps = {
    onRemove: handleFileRemove,
    beforeUpload: async (file) => {
      try {
        const formData = new FormData();
        formData.append("document", file);
        await addDocument(formData).unwrap();
        message.success(`${file.name} uploaded successfully.`);
      } catch {
        message.error(`Failed to upload ${file.name}`);
      }
      return false;
    },
    fileList,
    showUploadList: false,
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">E&O/ License Doc</h2>
      <div className="space-y-2 mb-4">
        {fileList.map((file) => (
          <div
            key={file.uid}
            className="flex items-center justify-between text-gray-700"
          >
            <span>
              Attached:{" "}
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                {file.name}
              </a>
            </span>
            <Button
              type="text"
              icon={<DeleteOutlined className="text-red-500" />}
              onClick={() => handleFileRemove(file)}
            />
          </div>
        ))}
      </div>
      <Upload {...uploadProps}>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-200">
          <PaperClipOutlined className="text-gray-600" />
          <span className="text-gray-700">
            {isLoading ? "Uploading..." : "Attach a File"}
          </span>
          <SendOutlined className="text-gray-600 ml-auto" />
        </div>
      </Upload>
    </div>
  );
};

export default DocumentAdd;
