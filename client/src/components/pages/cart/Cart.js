import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CartTable from "./CartTable";

import { createCart } from "../../../functions/cartFunctions";

import { toast } from "react-toastify";

import { Card } from "antd";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();

  const saveCartToDBHandler = () => {
    createCart(user.token, cart)
      .then((res) => {
        if (res.statusText === "OK") history.push("/cart/checkout");
      })
      .catch((e) =>
        toast.error(
          e.response ? e.response.error.message : "an error occurred!"
        )
      );
  };

  const totalPriceHandler = () => {
    if (cart.length > 0) {
      return cart.reduce((a, b) => {
        return a + b.count * b.price;
      }, 0);
    }
  };

  const cartActionHandler = (e, product, action) => {
    //update color in local storage
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("ecommerce-cart")) {
        cart = JSON.parse(localStorage.getItem("ecommerce-cart"));
      }

      //changing attributes of a product
      if (action === "color" || action === "count") {
        cart.map((p) => {
          if (p._id === product._id) {
            return (p[action] = e.target.value);
          } else return product;
        });
      }

      //removing a product from cart
      if (action === "remove") {
        cart = cart.filter((p) => {
          return p._id !== product._id;
        });
      }

      localStorage.setItem("ecommerce-cart", JSON.stringify(cart));

      //update product in redux store
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const colorChangeHandler = (e, product, action) => {
    cartActionHandler(e, product, action);
  };

  const countIncrementHandler = (e, product, action) => {
    //not allowing the negative numbers
    if (e.target.value < 1) {
      e.target.value = 1;
    }
    //checking if count is exceeding the available product quantity in db
    if (e.target.value > product.quantity) {
      e.target.value = product.quantity;
      toast.error(`Maximum ${product.title} available is ${product.quantity}`);
      return;
    }
    cartActionHandler(e, product, action);
  };

  const removeItemFromCartHandler = (e, product, action) => {
    cartActionHandler(e, product, action);
  };

  return (
    <div className="container-fluid">
      <div className="row pb-5">
        <div className="col-md-8">
          <h5 className="mt-2">cart Items/ {cart.length}</h5>
          {cart.length > 0 ? (
            <CartTable
              cart={cart}
              countIncrementHandler={countIncrementHandler}
              removeItemFromCartHandler={removeItemFromCartHandler}
              colorChangeHandler={colorChangeHandler}
            />
          ) : (
            <p>
              No items available in the cart,{" "}
              <Link to="/shop">continue shopping</Link>
            </p>
          )}
        </div>
        <div className="col-md-4">
          <Card className="mt-5">
            <h4 className="">Order Summary</h4>
            <hr />
            <p>Products: </p>
            {cart.map((product, index) => {
              return (
                <p key={index}>
                  {product.title} x {product.count} = ${product.price}
                </p>
              );
            })}
            <hr />
            <p>
              Total: <strong>${totalPriceHandler()}</strong>
            </p>
            <button className="btn btn-secondary" disabled={!cart.length}>
              {user ? (
                <p onClick={saveCartToDBHandler} className="m-0">
                  Proceed to Checkout
                </p>
              ) : (
                <Link to={{ pathname: "/login", state: { from: "/cart" } }}>
                  Login to Checkout
                </Link>
              )}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
