import React from "react";
import { Dropdown, Avatar, Menu } from "antd";
import { UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons";

const UserProfileDropdown = () => {
  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "profile":
        console.log("View Profile clicked");
        break;
      case "changePassword":
        console.log("Change Password clicked");
        break;
      case "logout":
        console.log("Logout clicked");
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>View Profile</Menu.Item>
      <Menu.Item key="changePassword" icon={<LockOutlined />}>Change Password</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <Avatar style={{ backgroundColor: "#1890ff", cursor: "pointer" }} icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default UserProfileDropdown;
