import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card } from "antd";

const SalesAnalyticsChart = ({ data }) => {
  

  return (
    <Card 
    title="Sales Analytics" 
    style={{ 
      borderRadius: 10, 
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)", 
      padding: 20, 
      margin: "20px auto", 
      maxWidth: 600 
    }}
  >
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  </Card>
  );
};

export default SalesAnalyticsChart;