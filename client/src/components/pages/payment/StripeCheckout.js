import React, { useState, useEffect } from "react";
import { createPaymentIntent } from "../../../functions/stripeFunctions";
import { createOrder } from "../../../functions/orderFunctions";
import { deleteCart } from "../../../functions/cartFunctions";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StripeCheckout = ({ setPaymentCompleted }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent(user.token, 200)
      .then((res) => {
        if (res.data) setClientSecret(res.data.clientSecret);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, [user]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement("card"),
        },
      })
      .then((result) => {
        // Handle result.error or result.paymentIntent
        if (result.error) {
          setIsLoading(false);
          return toast.error(result.error);
        }
        if (result.paymentIntent) {
          setIsLoading(false);
          setPaymentCompleted(true);
          toast.success("payment was successful");
          // resetting card values
          const cardElement = elements.getElement("card");
          cardElement.clear();

          setMessage(
            <div>
              Your Payment was successful, <br />
              <Link to="/user/history">
                see your order in your purchase history.
              </Link>
            </div>
          );

          //create order in DB
          createOrder(user.token, result.paymentIntent)
            .then((res) => {
              //delete cart from local storage
              if (typeof window !== "undefined") {
                localStorage.removeItem("ecommerce-cart");
              }
              //delete cart from redux store
              dispatch({
                type: "ADD_TO_CART",
                payload: [],
              });

              // reset coupon in redux store
              dispatch({
                type: "COUPON_APPLIED",
                payload: false,
              });

              //delete user cart because order is completed
              deleteCart(user.token)
                .then(res)
                .catch((e) =>
                  toast.error(
                    e.response ? e.response.data.error : "an error occurred!"
                  )
                );
            })
            .catch((e) =>
              toast.error(
                e.response ? e.response.data.error : "an error occurred!"
              )
            );
        }
      });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="payment-submit-button"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="payment-spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default React.memo(StripeCheckout);
