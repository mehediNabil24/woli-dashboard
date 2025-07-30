"use client";
import {
  DeleteOutlined,
  PaperClipOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps, message } from "antd";
import { useState, useEffect } from "react";
import {
  useAddDocumentMutation,
  useGetDocumentAgentQuery, // ✅ For refetching
} from "../../../redux/features/profile/profileApi";

const DocumentAdd = ({ documentAgent }) => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addDocument, { isLoading }] = useAddDocumentMutation();

  // ✅ Load initial documents into fileList whenever documentAgent changes
  useEffect(() => {
    if (documentAgent?.userDocuments?.length) {
      const mappedFiles: UploadFile[] = documentAgent.userDocuments.map(
        (doc) => ({
          uid: doc.id,
          name: doc.documentUrl.split("/").pop() || "document",
          status: "done",
          url: doc.documentUrl,
          type: doc.documentType,
        })
      );
      setFileList(mappedFiles);
    } else {
      setFileList([]); // If no docs
    }
  }, [documentAgent]);

  // ✅ Remove file from list (UI only, API delete optional)
  const handleFileRemove = (file: UploadFile) => {
    setFileList((prevList) =>
      prevList.filter((item) => item.uid !== file.uid)
    );
    // If you have a delete API, call it here
  };

  // ✅ Handle file upload
  const uploadProps: UploadProps = {
    onRemove: handleFileRemove,
    beforeUpload: async (file) => {
      try {
        const formData = new FormData();
        formData.append("document", file);

        await addDocument(formData).unwrap();
        message.success(`${file.name} uploaded successfully.`);

        // ✅ Re-fetch updated list from server
        await refetch();
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
