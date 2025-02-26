import React from "react";
import { Card, Statistic } from "antd";
import { CheckCircleOutlined, HourglassOutlined, DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const OrderSummaryCard = ({ totalOrders, pendingOrders, completedOrders, revenue }) => {
  return (
    <Card
      title="Order Summary"
      style={{ 
        width: 300, 
        textAlign: "center", 
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)", 
        borderRadius: 10, 
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)" 
      }}
    >
      <Statistic
        title="Total Orders"
        value={totalOrders}
        prefix={<ShoppingCartOutlined />}
        valueStyle={{ color: "#ffffff" }}
      />
      <Statistic
        title="Pending Orders"
        value={pendingOrders}
        valueStyle={{ color: "#ff9800" }}
        prefix={<HourglassOutlined />}
      />
      <Statistic
        title="Completed Orders"
        value={completedOrders}
        valueStyle={{ color: "#4caf50" }}
        prefix={<CheckCircleOutlined />}
      />
      <Statistic
        title="Revenue"
        value={revenue}
        precision={2}
        prefix={<DollarOutlined />}
        valueStyle={{ color: "#2196f3" }}
      />
    </Card>
  );
};

export default OrderSummaryCard;
