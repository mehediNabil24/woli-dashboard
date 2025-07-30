
import { UploadFile } from "antd";
import { useState } from "react";

const addDocument = () => {
      const [fileList, setFileList] = useState<UploadFile[]>([
        { uid: "1", name: "denialcertificate.png", status: "done", url: "#" },
        { uid: "2", name: "license2023.pdf", status: "done", url: "#" }
      ]);
    return (
        <div>
            
        </div>
    );
};

export default addDocument;