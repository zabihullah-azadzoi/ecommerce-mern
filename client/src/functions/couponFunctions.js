import axios from "axios";

export const createCoupon = async (authtoken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/coupon`,
    { coupon },
    {
      headers: { authtoken },
    }
  );
};

export const getAllCoupons = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/coupon`, {
    headers: { authtoken },
  });
};

export const deleteCoupon = async (authtoken, couponId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/coupon/${couponId}`,
    {
      headers: { authtoken },
    }
  );
};
