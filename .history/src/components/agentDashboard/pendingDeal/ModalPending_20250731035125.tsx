"use client"
import { Modal, Input, Select, Button } from "antd"

const { Option } = Select
const { TextArea } = Input

interface EditDealModalProps {
  visible: boolean
  onCancel: () => void
  // You can pass the data of the record being edited here
  // For now, we'll use placeholder data matching the image
  initialData?: {
    key:string,
   
    state: string
    company: string
    product: string
    clientFirstName: string
    clientLastName: string
    applicationNumber: string
    annualPremium: string
    note: string
  }
}

export default function EditDealModal({ visible, onCancel, initialData }: EditDealModalProps) {
  console.log(initialData?.state, "initialData");
  // Default data for demonstration, matching the image
  const defaultData = initialData || {
    
    state: "",
    company: "",
    product: "",
    clientFirstName: "",
    clientLastName: "",
    applicationNumber: "",
    annualPremium: "",
    note: "",
  }

  return (
    <Modal
      title={
        <div className="text-center text-2xl font-bold uppercase pb-2 border-b-2 border-black inline-block">
          EDIT DEALS
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null} // Hide default footer buttons
      width={700} // Adjust width as needed
      centered
      destroyOnClose // Destroy modal content on close to reset form
      className="edit-deal-modal"
    >
      <div className="p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-bold text-gray-800 mb-1">
              State*
            </label>
            <Select id="state" defaultValue={defaultData.state} className="w-full" size="large">
              {/* <Option value="California">California</Option>
              <Option value="New York">New York</Option> */}
            </Select>
          </div>

          {/* Select Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-bold text-gray-800 mb-1">
              Select Company*
            </label>
            <Select id="company" defaultValue={defaultData.company} className="w-full" size="large">
              {/* <Option value="Xyz">Xyz</Option>
              <Option value="Abc">Abc</Option> */}
            </Select>
          </div>

          {/* Product */}
          <div>
            <label htmlFor="product" className="block text-sm font-bold text-gray-800 mb-1">
              Product*
            </label>
            <Select id="product" defaultValue={defaultData.product} className="w-full" size="large">
              {/* <Option value="Omaha">Omaha</Option>
              <Option value="Product B">Product B</Option> */}
            </Select>
          </div>

          {/* Client Name */}
          <div className="col-span-full">
            <label htmlFor="clientFirstName" className="block text-sm font-bold text-gray-800 mb-1">
              Client Name*
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="clientFirstName"
                defaultValue={defaultData.clientFirstName}
                placeholder="First Name"
                size="large"
              />
              <Input
                id="clientLastName"
                defaultValue={defaultData.clientLastName}
                placeholder="Last Name"
                size="large"
              />
            </div>
          </div>

          {/* Application Number */}
          <div className="col-span-full">
            <label htmlFor="applicationNumber" className="block text-sm font-bold text-gray-800 mb-1">
              Application Number*
            </label>
            <Input id="applicationNumber" defaultValue={defaultData.applicationNumber} size="large" />
          </div>

          {/* Annual Premium */}
          <div className="col-span-full">
            <label htmlFor="annualPremium" className="block text-sm font-bold text-gray-800 mb-1">
              Annual Premium*
            </label>
            <Input id="annualPremium" defaultValue={defaultData.annualPremium} size="large" />
          </div>

          {/* Note */}
          <div className="col-span-full">
            <label htmlFor="note" className="block text-sm font-bold text-gray-800 mb-1">
              Note*
            </label>
            <TextArea id="note" defaultValue={defaultData.note} rows={4} size="large" />
          </div>

          {/* Update Now Button */}
          <div className="col-span-full flex justify-center mt-6">
            <Button onClick={()=>console.log(initialData?.key)}
              type="primary"
              htmlType="submit"
              style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "12px 40px",
              fontSize: "18px",
              fontWeight: 600,
              height: "auto",
              transition: "background 0.2s",
              }}
              className="update-now-btn"
            >
              Update Now
            </Button>
            <style>{`
              .update-now-btn:hover {
              background-color: #333 !important;
              }
            `}</style>
          </div>
        </form>
      </div>
      <style>{`
        .edit-deal-modal .ant-modal-content {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .edit-deal-modal .ant-modal-header {
          border-bottom: none;
          padding: 24px 24px 0;
          text-align: center;
        }
        .edit-deal-modal .ant-modal-title {
          width: 100%;
          text-align: center;
        }
        .edit-deal-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }
        .edit-deal-modal .ant-input-affix-wrapper,
        .edit-deal-modal .ant-select-selector,
        .edit-deal-modal .ant-input-textarea {
          border-radius: 4px;
          border-color: #d9d9d9;
        }
        .edit-deal-modal .ant-input-affix-wrapper:hover,
        .edit-deal-modal .ant-select-selector:hover,
        .edit-deal-modal .ant-input-textarea:hover {
          border-color: #40a9ff; /* Ant Design default hover blue */
        }
        .edit-deal-modal .ant-input-affix-wrapper-focused,
        .edit-deal-modal .ant-select-focused .ant-select-selector,
        .edit-deal-modal .ant-input-textarea:focus {
          border-color: #40a9ff !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
      `}</style>
    </Modal>
  )
}
