import axios from "axios";

export const createOrder = async (authtoken, paymentIntent) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/order`,
    { paymentIntent: paymentIntent },
    {
      headers: { authtoken },
    }
  );
};

export const getOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/order`, {
    headers: { authtoken },
  });
};

//admin route functions
export const getAllOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
    headers: { authtoken },
  });
};

export const getOrdersSalesReport = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/api/orders/sales-report`,
    {
      headers: { authtoken },
    }
  );
};

export const updateOrderStatus = async (authtoken, orderId, orderStatus) => {
  return await axios.patch(
    `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`,
    { orderStatus },
    {
      headers: { authtoken },
    }
  );
};
