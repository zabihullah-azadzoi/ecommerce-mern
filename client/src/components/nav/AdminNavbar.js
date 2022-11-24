import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  DoubleRightOutlined,
  FormOutlined,
  InboxOutlined,
  ProfileOutlined,
  RightSquareOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  StrikethroughOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import useMenuModeToggler from "../../customHooks/useMenuModeToggler";

const AdminNavbar = () => {
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
      <Link to="/admin/dashboard">Dashboard</Link>,
      "/admin/dashboard",
      <DashboardOutlined />
    ),
    getItem(
      <Link to="/admin/orders">Orders</Link>,
      "/admin/orders",
      <ShoppingCartOutlined />
    ),
    getItem(
      <Link to="/admin/product">Product</Link>,
      "/admin/product",
      <FormOutlined />
    ),
    getItem(
      <Link to="/admin/products">Products</Link>,
      "/admin/products",
      <InboxOutlined />
    ),
    getItem(
      <Link to="/admin/category">Category</Link>,
      "/admin/category",
      <RightSquareOutlined />
    ),
    getItem(
      <Link to="/admin/sub">Sub Category</Link>,
      "/admin/sub",
      <DoubleRightOutlined />
    ),
    getItem(
      <Link to="/admin/coupon">Coupon</Link>,
      "/admin/coupon",
      <StrikethroughOutlined />
    ),
    getItem(
      <Link to="/admin/users">Users</Link>,
      "/admin/users",
      <UserOutlined />
    ),
    getItem(
      <Link to="/admin/settings">Settings</Link>,
      "/admin/settings",
      <SettingOutlined />
    ),
    getItem(
      <Link to="/admin/profile">Profile</Link>,
      "/admin/profile",
      <ProfileOutlined />
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
export default React.memo(AdminNavbar);
