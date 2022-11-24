import axios from "axios";

export const createCart = async (authtoken, cart) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/user/cart`,
    { cart },
    {
      headers: { authtoken },
    }
  );
};

export const getCart = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/user/cart`, {
    headers: { authtoken },
  });
};

export const deleteCart = async (authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/cart`, {
    headers: { authtoken },
  });
};

export const applyCoupon = async (authtoken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/user/cart/coupon`,
    { coupon },
    {
      headers: { authtoken },
    }
  );
};
