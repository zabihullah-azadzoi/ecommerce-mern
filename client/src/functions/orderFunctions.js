import axios from "axios";

export const createOrder = async (authtoken, paymentIntent) => {
  return await axios.post(
    "http://localhost:8000/api/order",
    { paymentIntent: paymentIntent },
    {
      headers: { authtoken },
    }
  );
};

export const getOrders = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/order", {
    headers: { authtoken },
  });
};

//admin route functions
export const getAllOrders = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/orders", {
    headers: { authtoken },
  });
};

export const updateOrderStatus = async (authtoken, orderId, orderStatus) => {
  return await axios.patch(
    `http://localhost:8000/api/orders/${orderId}`,
    { orderStatus },
    {
      headers: { authtoken },
    }
  );
};
