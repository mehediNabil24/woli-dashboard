import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const { Text, Title } = Typography;

// Color palette matching the image
const COLORS = ["#f97316", "#facc15", "#22c55e"]; // orange, yellow, green

const BestSelling: React.FC = () => {
  const pieData = [
    { label: "Mailers", value: 81900.0, color: COLORS[0] },
    { label: "Dialers", value: 12392.5, color: COLORS[1] },
    { label: "MISC Expenses", value: 5000.0, color: COLORS[2] }
  ];

  const totalExpenses = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <Row gutter={[10, 10]} align="middle">
        <Col xs={24}>
          <div style={{ width: "100%", minWidth: 100, height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={3}
                  startAngle={90}
                  endAngle={-270}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
            {pieData.map((item, index) => (
              <Row justify="space-between" key={index} style={{ marginBottom: 8 }}>
                <Text>
                  <span style={{ color: item.color, marginRight: 8 }}>●</span>
                  {item.label}
                </Text>
                <Text>${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
              </Row>
            ))}
          </div>

          <Row justify="space-between" style={{ marginTop: 16 }}>
            <Title level={5}>Total Expenses</Title>
            <Title level={5}>
              ${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Title>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default BestSelling;
