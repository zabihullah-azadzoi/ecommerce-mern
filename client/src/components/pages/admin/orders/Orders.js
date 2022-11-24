import { useState, useEffect, useCallback } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";
import OrderCard from "../../../cards/OrderCard";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../../functions/orderFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const user = useSelector((state) => state.user);

  const renderAllOrders = useCallback(() => {
    if (user === "null") return;
    getAllOrders(user.token)
      .then((res) => setOrders(res.data))
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, [user]);

  useEffect(() => {
    renderAllOrders();
  }, [renderAllOrders]);

  const updateOrderStatusHandler = (orderId, orderStatus) => {
    updateOrderStatus(user.token, orderId, orderStatus)
      .then((res) => {
        toast.success(`order is ${orderStatus}`);
        renderAllOrders();
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 p-0">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4 className="mt-3 mb-5 ">
            {orders.length > 0 ? "All available orders" : "No order available"}
          </h4>
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <OrderCard
                  key={order._id}
                  order={order}
                  admin={true}
                  updateOrderStatusHandler={updateOrderStatusHandler}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
