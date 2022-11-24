import { useState, useEffect } from "react";

import UserNavbar from "../../nav/UserNavbar";
import OrderCard from "../../cards/OrderCard";
import { getOrders } from "../../../functions/orderFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getOrders(user.token)
      .then((res) => setOrders(res.data))
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, [user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 p-0">
          <UserNavbar />
        </div>
        <div className="col">
          <h5 className="text-center mt-3 mb-5">
            {orders.length > 0 ? "Purchase History" : "No purchase available"}
          </h5>
          {orders.length > 0 &&
            orders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
