import React from "react";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  HistoryOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import useMenuModeToggler from "../../customHooks/useMenuModeToggler";

const UserNavbar = () => {
  const selectedKey = window.location.pathname;
  const { menuMode } = useMenuModeToggler();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <Link to="/user/history">History</Link>,
      "/user/history",
      <HistoryOutlined />
    ),
    getItem(
      <Link to="/user/wishlist">Wishlist</Link>,
      "/user/wishlist",
      <HeartOutlined />
    ),
    getItem(
      <Link to="/user/profile">Profile</Link>,
      "/user/profile",
      <LockOutlined />
    ),
  ];

  return (
    <Menu
      mode={menuMode}
      theme="dark"
      selectedKeys={selectedKey}
      className="admin-user-menu"
      items={items}
      style={{
        height: "calc(100vh - 3rem)",
        position: "sticky",
        width: "100%",
        top: "3rem",
        left: "0",
        maxWidth: "16.5rem",
        color: "#ffffff",
      }}
    />
  );
};
export default React.memo(UserNavbar);
