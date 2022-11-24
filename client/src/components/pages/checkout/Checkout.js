import { useState, useEffect } from "react";
import {
  getCart,
  deleteCart,
  applyCoupon,
} from "../../../functions/cartFunctions";
import { updateUserAddress } from "../../../functions/userFunctions";
import { createOrder } from "../../../functions/orderFunctions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AddressForm from "../../forms/AddressForm";
import { useHistory } from "react-router-dom";
import { Radio, Space } from "antd";
import { Card } from "antd";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalPayable, setTotalPayable] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    getCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred")
      );
  }, [user]);

  const saveAddressToDbHandler = (address) => {
    updateUserAddress(user.token, address)
      .then((res) => {
        setAddress(res.data.address);
        toast.success("Address saved successfully.");
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred")
      );
  };

  const emptyCartHandler = () => {
    deleteCart(user.token)
      .then((res) => {
        if (res.statusText === "OK") {
          //deleting cart data from local storage
          if (typeof window !== "undefined") {
            localStorage.removeItem("ecommerce-cart");
          }

          //deleting cart data from redux store
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });

          setProducts([]);
          setCartTotal(0);
          toast.success("Cart data removed.");

          setTimeout(() => {
            history.push("/cart");
          }, 2000);
        }
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred")
      );
  };

  const applyCouponFormSubmitHandler = (e) => {
    e.preventDefault();
    applyCoupon(user.token, coupon)
      .then((res) => {
        if (res.data.message) {
          toast.error(res.data.message);
          setTotalPayable(0);

          //adding coupon to redux
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
        } else if (res.data.totalAfterDiscount) {
          //adding coupon to redux
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
          setTotalPayable(res.data.totalAfterDiscount);
          toast.success("Coupon applied successfully");
        }
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred")
      );
  };

  const placeOrderHandler = () => {
    if (paymentMode === "card") return history.push("/cart/payment");
    else if (paymentMode === "cod") {
      createOrder(user.token, null)
        .then((res) => {
          setPaymentMode("");
          toast.success(
            "order was placed successfully, you are being redirected to your history page!"
          );
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
          toast.error(e.response ? e.response.data.error : "an error occurred!")
        );

      setTimeout(() => {
        history.push("/user/history");
      }, 4000);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3 mb-5 ">
        <Card className="col-md-6">
          <h3>Delivery Address</h3>
          <AddressForm saveAddressToDbHandler={saveAddressToDbHandler} />
          <br />
          <br />
          <hr />
          <br />
          <h5>Got a Coupon?</h5>

          <br />
          <form onSubmit={applyCouponFormSubmitHandler}>
            <input
              className="form-control"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-info mt-3 mb-3 float-end"
              disabled={!coupon}
            >
              Apply Coupon
            </button>
          </form>
        </Card>
        <Card className="col-md-6">
          <h3>Order Summary</h3>
          <hr />
          <p>Products: {products.length}</p>
          <hr />
          {products.map((p, i) => {
            return (
              <p key={i}>
                {p.product.title} ({p.color}) x {p.count} = ${p.price * p.count}
              </p>
            );
          })}
          <hr />
          <p>
            Cart total:{" "}
            {totalPayable > 0 ? (
              <del>
                <strong>${cartTotal}</strong>
              </del>
            ) : (
              <strong>${cartTotal}</strong>
            )}
          </p>
          {totalPayable > 0 && (
            <p
              className=" pt-3 pb-3 text-light line-center"
              style={{ backgroundColor: "limegreen" }}
            >
              Total After Discount: <strong>${totalPayable}</strong>
            </p>
          )}
          <div className="row">
            <div className="mt-3 mb-5">
              <label className="d-block">Payment mode:</label>
              <Radio.Group
                onChange={(e) => setPaymentMode(e.target.value)}
                value={paymentMode}
                className="ms-3"
              >
                <Space direction="vertical">
                  <Radio value="card">Card Payment</Radio>
                  <Radio value="cod">Cash on Delivery</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="col-6">
              <button
                className="btn btn-info"
                disabled={!address || !products.length || paymentMode === ""}
                onClick={() => placeOrderHandler()}
              >
                Place Order
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-info"
                disabled={!products.length}
                onClick={emptyCartHandler}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
