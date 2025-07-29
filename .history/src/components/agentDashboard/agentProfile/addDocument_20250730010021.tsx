"use client"
import { UploadFile } from "antd";
import { useState } from "react";

const addDocument = () => {
      const [fileList, setFileList] = useState<UploadFile[]>([
        { uid: "1", name: "denialcertificate.png", status: "done", url: "#" },
        { uid: "2", name: "license2023.pdf", status: "done", url: "#" }
      ]);
        const handleFileRemove = (file: UploadFile) => {
          setFileList((prevList) =>
            prevList.filter((item) => item.uid !== file.uid)
          );
        };
      
        const uploadProps: UploadProps = {
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
        <div>
            
        </div>
    );
};

export default addDocument;