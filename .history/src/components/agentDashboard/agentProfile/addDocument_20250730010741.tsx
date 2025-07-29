"use client"
import { DeleteOutlined, PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
const addDocument = () => {
    return (
         <div>
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
              <span className="text-gray-700">Attach a File</span>
              <SendOutlined className="text-gray-600 ml-auto" />
            </div>
          </Upload>
        </div>
        </div>
    );
};

export default addDocument;







const addDocuments = () => {
      const [fileList, setFileList] = useState<UploadFile[]>([
        { uid: "1", name: "denialcertificate.png", status: "done", url: "#" },
        { uid: "2", name: "license2023.pdf", status: "done", url: "#" }
      ]);
        const handleFileRemove = (file: UploadFile) => {
          setFileList((prevList) =>
            prevList.filter((item) => item.uid !== file.uid)
          );
        };
      
        const uploadProps: UploadProps= {
          onRemove: handleFileRemove,
          beforeUpload: (file) => {
            setFileList((prev) => [...prev, file]);
            message.success(`${file.name} file uploaded successfully.`);
            return false;
          },
          fileList,
          showUploadList: false
        };
    return (
       
    );
};

export default addDocuments;