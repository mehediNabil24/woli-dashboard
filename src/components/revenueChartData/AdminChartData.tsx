import { Select } from "antd"
import AdminRevenueChart from "../revenueChart/AdminRevenueChart"

const { Option } = Select

const AdminChartData = () => {
  // Static data matching the image's visual representation
  const weeklyData = [
    { day: "S", mailers: 12000, dialers: 5000, miscExpenses: 18000 },
    { day: "M", mailers: 7000, dialers: 12000, miscExpenses: 12000 },
    { day: "T", mailers: 14000, dialers: 20000, miscExpenses: 20000 },
    { day: "W", mailers: 28000, dialers: 7000, miscExpenses: 32000 },
    { day: "F", mailers: 22000, dialers: 12000, miscExpenses: 28000 },
    { day: "S", mailers: 24000, dialers: 25000, miscExpenses: 30000 },
  ]

  return (
    <div className="">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-gray-800">YTD</h1>
        <div className="flex items-center space-x-4">
          <Select defaultValue="month" style={{ width: 120 }} size="middle">
            <Option value="month">Month</Option>
            <Option value="january">January</Option>
            <Option value="february">February</Option>
          </Select>
          <Select defaultValue="week" style={{ width: 120 }} size="middle">
            <Option value="week">Week</Option>
            <Option value="week1">Week 1</Option>
            <Option value="week2">Week 2</Option>
          </Select>
        </div>
      </div>
      <AdminRevenueChart weeklyData={weeklyData} />
    </div>
  )
}

export default AdminChartData
