import type React from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from "recharts"

type ChartPoint = {
  day: string
  mailers: number
  dialers: number
  miscExpenses: number
}

interface RevenueChartProps {
  weeklyData: ChartPoint[]
}

const formatCurrency = (value: number) => {
  if (value >= 1000 && value < 30000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  if (value >= 30000) {
    return `30K+`
  }
  return `${value}`
}

const AdminRevenueChart: React.FC<RevenueChartProps> = ({ weeklyData }) => {
  const data = weeklyData?.length > 0 ? weeklyData : []

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-start items-center mb-4 space-x-4">
        <span className="text-sm font-medium text-gray-700">
          <span className="inline-block w-4 h-4 bg-orange-500 rounded-full mr-1"></span>
          Mailers
        </span>
        <span className="text-sm font-medium text-gray-700">
          <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full mr-1"></span>
          Dialers
        </span>
        <span className="text-sm font-medium text-gray-700">
          <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-1"></span>
          MISC Expenses
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            domain={[0, 35000]} // Set a fixed domain to match the image scale
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
              color: "#000",
            }}
            itemStyle={{
              color: "#000",
            }}
            formatter={(value: number, name: string) => {
              let label = ""
              if (name === "mailers") label = "Mailers"
              else if (name === "dialers") label = "Dialers"
              else if (name === "miscExpenses") label = "MISC Expenses"
              return [
                <span key="value" className="font-bold">
                  ${value}
                </span>,
                <span key="label">{label}</span>,
              ]
            }}
            labelFormatter={(label) => `Day: ${label}`}
          />
          {/* Mailers Line - Solid Orange with Area */}
          <Area
            type="monotone"
            dataKey="mailers"
            stroke="#f97316" // Orange-500
            fillOpacity={0.3}
            fill="url(#colorMailers)"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{
              r: 6,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#f97316",
            }}
          />
          <Line
            type="monotone"
            dataKey="mailers"
            name="mailers"
            stroke="#f97316" // Orange-500
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{
              r: 6,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#f97316",
            }}
          />
          {/* Dialers Line - Dotted Yellow */}
          <Line
            type="monotone"
            dataKey="dialers"
            name="dialers"
            stroke="#facc15" // Yellow-400
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={{ r: 0 }}
            activeDot={{
              r: 6,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#facc15",
            }}
          />
          {/* MISC Expenses Line - Dashed Green */}
          <Line
            type="monotone"
            dataKey="miscExpenses"
            name="miscExpenses"
            stroke="#22c55e" // Green-500
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 0 }}
            activeDot={{
              r: 6,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#22c55e",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AdminRevenueChart
