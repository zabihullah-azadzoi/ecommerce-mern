import {
  HomeOutlined,
  FormOutlined,
  LockOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Menu, Badge, Avatar, Image } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Search from "./Search";

import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const [userIsAvailable, setUserIsAvailable] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { user, cart } = useSelector((state) => ({ ...state }));
  const onClick = (e) => {
    setCurrent(e.key);
  };
  useEffect(() => {
    if (user && user.token) {
      setUserIsAvailable(true);
    } else {
      setUserIsAvailable(false);
    }
  }, [user]);

  const logoutHandler = async () => {
    try {
      await auth.signOut();

      history.push("/login");
      dispatch({
        type: "LOGOUT",
        payload: "null",
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  const items1 = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/shop">Shop</Link>,
      key: "shop",
      icon: <ShoppingOutlined />,
    },
    {
      label: (
        <Badge count={cart.length} offset={[10, 0]}>
          {" "}
          <Link to="/cart">Cart</Link>
        </Badge>
      ),
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },

    {
      icon:
        user && user.image ? (
          <Avatar
            style={{ width: "2.3rem", height: "2.3rem", marginRight: "-8px" }}
            src={
              <img
                alt=""
                src={user.image}
                style={{
                  width: "2.3rem",
                }}
              />
            }
          />
        ) : (
          <Avatar
            style={{
              marginRight: "-8px",
              color: "#fff",
              backgroundColor: "#0077b6",
            }}
          >
            {user && user.name && user.name.charAt(0).toUpperCase()}
          </Avatar>
        ),
      className: "float-end",
      children: [
        {
          type: "group",
          children: [
            {
              label:
                user && user.role === "admin" ? (
                  <Link to="/admin/dashboard">Dashboard</Link>
                ) : (
                  <Link to="/user/history">Dashboard</Link>
                ),
              icon: <DashboardOutlined />,
              key: "setting:1",
            },
            {
              label: "Logout",
              key: "logout",
              icon: <LogoutOutlined />,
              onClick: logoutHandler,
            },
          ],
        },
      ],
    },
    {
      label: <Search />,
      className: "float-end",
    },
  ];
  const items2 = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/shop">Shop</Link>,
      key: "shop",
      icon: <ShoppingOutlined />,
    },
    {
      label: (
        <Badge count={cart.length} offset={[10, 0]}>
          {" "}
          <Link to="/cart">Cart</Link>
        </Badge>
      ),
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },

    {
      label: <Link to="/register">Register</Link>,
      key: "register",
      className: "float-end",
      icon: <FormOutlined />,
    },
    {
      label: <Link to="/login">Login</Link>,
      key: "login",
      className: "float-end",
      icon: <LockOutlined />,
    },
    {
      label: <Search />,
      className: "float-end",
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      className="shadow-sm"
      mode="horizontal"
      items={userIsAvailable ? items1 : items2}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        left: "0",
        height: "3rem",
        width: "100%",
        zIndex: "10000",
      }}
    />
  );
};
export default Header;
