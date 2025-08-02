"use client"
import { Modal, Input, Form, Button } from "antd"
import { useCreateTeamMutation } from "../../../redux/features/team/teamApi" // ✅ adjust path if needed
import { toast } from "sonner"

interface CreateTeamModalProps {
  open: boolean
  onClose: () => void
}

export default function CreateTeamModal({ open, onClose }: CreateTeamModalProps) {
  const [form] = Form.useForm()
  const [createTeam, { isLoading }] = useCreateTeamMutation()

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const payload = {
          name: values.teamName,
          code: values.teamCode,
        }

        const response = await createTeam(payload).unwrap()
        toast.success(response?.message || "Team created successfully")

        form.resetFields()
        onClose()
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create team")
      }
    })
  }

  return (
    <Modal
      title="Create New Team"
      open={open}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Team Name"
          name="teamName"
          rules={[{ required: true, message: "Please enter a team name" }]}
        >
          <Input placeholder="Enter team name" />
        </Form.Item>

        <Form.Item
          label="Team Code"
          name="teamCode"
          rules={[{ required: true, message: "Please enter a team code" }]}
        >
          <Input placeholder="Enter team code" />
        </Form.Item>

        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            loading={isLoading}
            onClick={handleOk}
            className="bg-yellow-400 text-black"
          >
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
