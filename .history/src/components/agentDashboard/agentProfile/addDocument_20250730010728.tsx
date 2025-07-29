import React from 'react';

const addDocument = () => {
    return (
        <div>
            
        </div>
    );
};

export default addDocument;




"use client"
import { DeleteOutlined, PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";


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