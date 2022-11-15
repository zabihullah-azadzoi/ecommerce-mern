import axios from "axios";

export const createCoupon = async (authtoken, coupon) => {
  return await axios.post(
    "http://localhost:8000/api/coupon",
    { coupon },
    {
      headers: { authtoken },
    }
  );
};

export const getAllCoupons = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/coupon", {
    headers: { authtoken },
  });
};

export const deleteCoupon = async (authtoken, couponId) => {
  return await axios.delete(`http://localhost:8000/api/coupon/${couponId}`, {
    headers: { authtoken },
  });
};
