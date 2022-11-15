import axios from "axios";

export const createCart = async (authtoken, cart) => {
  return await axios.post(
    "http://localhost:8000/api/user/cart",
    { cart },
    {
      headers: { authtoken },
    }
  );
};

export const getCart = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/user/cart", {
    headers: { authtoken },
  });
};

export const deleteCart = async (authtoken) => {
  return await axios.delete("http://localhost:8000/api/user/cart", {
    headers: { authtoken },
  });
};

export const applyCoupon = async (authtoken, coupon) => {
  return await axios.post(
    "http://localhost:8000/api/user/cart/coupon",
    { coupon },
    {
      headers: { authtoken },
    }
  );
};
