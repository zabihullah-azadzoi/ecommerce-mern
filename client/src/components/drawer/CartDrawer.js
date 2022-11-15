import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Drawer } from "antd";
const defaultImage = require("../../assets/default-product.png");

const CartDrawer = () => {
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const closeDrawerHandler = () => {
    dispatch({
      type: "OPEN_DRAWER",
      payload: false,
    });
  };

  return (
    <Drawer
      title="All Products in Cart"
      headerStyle={{ backgroundColor: "#17A2B8" }}
      placement="right"
      onClose={closeDrawerHandler}
      open={drawer}
      className="text-center"
    >
      {cart.length > 0 &&
        cart.map((product, index) => {
          return (
            <div className="row " key={index}>
              <div className="col mb-5 ">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt=""
                    className="rounded-top"
                    style={{ height: "10rem", width: "80%" }}
                  />
                ) : (
                  <img
                    src={defaultImage}
                    alt=""
                    className="rounded-top"
                    style={{ height: "10rem", width: "80%" }}
                  />
                )}
                <p
                  className="bg-secondary text-light rounded-bottom"
                  style={{ width: "80%", margin: "auto" }}
                >
                  {product.title} x {product.count}
                </p>
              </div>
            </div>
          );
        })}
      <Link to="/cart" className="text-light" onClick={closeDrawerHandler}>
        <button className="btn btn-info" style={{ width: "80%" }}>
          Visit Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default CartDrawer;
