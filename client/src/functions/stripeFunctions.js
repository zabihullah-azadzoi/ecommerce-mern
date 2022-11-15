import axios from "axios";

export const createPaymentIntent = async (authtoken, coupon) => {
  return await axios.post(
    "http://localhost:8000/create-payment-intent",
    { couponApplied: coupon },
    {
      headers: { authtoken },
    }
  );
};
