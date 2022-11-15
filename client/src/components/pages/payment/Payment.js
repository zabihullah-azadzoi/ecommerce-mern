import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../../functions/stripeFunctions";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";

import "../../../assets/css/Payment.css";

import StripeCheckout from "./StripeCheckout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [payable, setPayable] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const { user, coupon } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent(user.token, coupon).then((res) => {
      if (res.data) {
        setCartTotal(res.data.cartTotal);
        setPayable(res.data.payable);
        setClientSecret(res.data.clientSecret);
      }
    });
  }, [user, coupon]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: clientSecret,
    appearance,
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-8 offset-md-2 ">
          <h5 className=" mt-5 mb-5 ">Complete your payment</h5>
          {!paymentCompleted && (
            <Card
              style={{ width: "30vw", minWidth: "31rem", margin: "auto" }}
              className="mb-2"
              actions={[
                <>
                  <DollarOutlined key="dollar" className="text-success" />{" "}
                  <p className="p-0 m-0 text-success">
                    Total amount: ${cartTotal}
                  </p>
                </>,
                <>
                  <CheckOutlined key="dollar" className="text-success" />{" "}
                  <p className="p-0 m-0 text-success">Payable: ${payable}</p>
                </>,
              ]}
            >
              {coupon ? (
                <p className="m-0 alert alert-success">Coupon Applied!</p>
              ) : (
                <p className="m-0 alert alert-danger">No coupon has applied!</p>
              )}
            </Card>
          )}

          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <StripeCheckout setPaymentCompleted={setPaymentCompleted} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
