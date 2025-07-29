"use client";
import {
  DeleteOutlined,
  PaperClipOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps, message } from "antd";
import { useState } from "react";
import { useAddDocumentMutation } from "../../../redux/features/profile/profileApi";

const DocumentAdd = ({documentAgent}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
   
  ]);

  const [addDocument, { isLoading }] = useAddDocumentMutation();

  // Remove file from list
  const handleFileRemove = (file: UploadFile) => {
    setFileList((prevList) =>
      prevList.filter((item) => item.uid !== file.uid)
    );
  };

  // Handle file upload
  const uploadProps: UploadProps = {
    onRemove: handleFileRemove,
    beforeUpload: async (file) => {
      try {
        // Create FormData
        const formData = new FormData();
        formData.append("document", file);

        // Call API
        const res = await addDocument(formData).unwrap();
console.log(res, "res");
        // On success, update file list
        setFileList((prev) => [
          ...prev,
          {
            uid: file.uid,
            name: file.name,
            status: "done",
            url: res?.fileUrl || "#", // file URL from backend
          },
        ]);

        message.success(`${file.name} uploaded successfully.`);
      } catch (error) {
        console.error(error);
        message.error(`Failed to upload ${file.name}`);
      }

      return false; // Prevent Ant Design's default upload
    },
    fileList,
    showUploadList: false,
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        E&O/ License Doc
      </h2>
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
