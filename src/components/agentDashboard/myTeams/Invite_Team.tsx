/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Form, Input, Select, Button, Row, Col, Modal, message } from "antd"
// import "./invite-team-form.css"

const { Option } = Select

export default function InviteTeamForm({ openModal, setOpenModal }: any) {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Form values:", values)
    message.success("Invitation sent!")
    form.resetFields()
    setOpenModal(false)
  }

  return (
    <Modal
     
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={null}
      destroyOnClose
    >
        <h1 className="text-[27px] font-bold mb-4 text-center uppercase underline">Invite Team</h1>
      <div >
        <Form form={form} layout="vertical" onFinish={onFinish} className="invite-team-form ">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
             
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter a name" }]}
              >
                <Input placeholder="e.g. Emily Carter" size="large" className="custom-input" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Levels"
                name="level"
                rules={[{ required: true, message: "Please select a level" }]}
                initialValue="agent-level-1"
              >
                <Select placeholder="Select level" size="large" className="custom-select">
                  <Option value="agent-level-1">Agent (level 1)</Option>
                  <Option value="agent-level-2">Agent (level 2)</Option>
                  <Option value="supervisor">Supervisor</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="e.g. Xyz@gmail.com" size="large" className="custom-input" />
          </Form.Item>

          <div className="submit-button-container">
            <Button type="primary" htmlType="submit" size="large" className="submit-button !bg-black hover:!bg-[#333333]">
              Send Invitation
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
