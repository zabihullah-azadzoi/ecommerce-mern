import { useState } from "react";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import AverageRating from "../pages/home/AverageRating";

import { useDispatch } from "react-redux";

import {
  EyeOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const defaultImage = require("../../assets/default-product.png");

//this component is used both in home page and in wishlist page, the differences are being
// controlled by wishlist prop

const HomeProductCard = ({
  product,
  wishlist = false,
  removeFromWishlistHandler,
}) => {
  const [tooltipTitle, setTooltipTitle] = useState("Click to Add");
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    //add product to local storage
    if (typeof window !== "undefined") {
      let cart = [];
      const existedCart = window.localStorage.getItem("ecommerce-cart");
      if (existedCart !== null) cart = JSON.parse(existedCart);

      //checking for existing product before pushing
      if (
        cart.length > 0 &&
        cart.find((pro) => pro._id === product._id) !== undefined
      ) {
        //open cartDrawer
        dispatch({
          type: "OPEN_DRAWER",
          payload: true,
        });
        return;
      }
      cart.push({ ...product, count: 1 });
      window.localStorage.setItem("ecommerce-cart", JSON.stringify(cart));
      setTooltipTitle("Added");

      //add product to redux store
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      //open cartDrawer
      dispatch({
        type: "OPEN_DRAWER",
        payload: true,
      });
    }
  };

  return (
    <>
      <AverageRating product={product} />
      <Card
        hoverable
        className="card mb-3 d-inline-block"
        style={{ width: "19rem" }}
        cover={
          <img
            alt={product.title}
            src={
              product.images.length > 0 ? product.images[0].url : defaultImage
            }
            style={{ height: "17rem" }}
          />
        }
        actions={
          wishlist
            ? [
                <Link to={`/product/${product.slug}`}>
                  {" "}
                  <EyeOutlined className="text-info mb-2" />
                  <p>View Product</p>
                </Link>,
                // for wishlist page
                <div>
                  <HeartOutlined className="text-info mb-2 " />
                  <p onClick={() => removeFromWishlistHandler(product._id)}>
                    Remove from Wishlist
                  </p>
                </div>,
                <div>
                  {" "}
                  <ShoppingCartOutlined className="text-success mb-2" />
                  {product.quantity < 1 ? (
                    <p className="text-danger">out of stock</p>
                  ) : (
                    <Tooltip title={tooltipTitle}>
                      <p
                        onClick={() => {
                          addToCartHandler(product);
                        }}
                      >
                        Add to Cart
                      </p>
                    </Tooltip>
                  )}
                </div>,
              ]
            : [
                <Link to={`/product/${product.slug}`}>
                  {" "}
                  <EyeOutlined className="text-info mb-2" />
                  <p>View Product</p>
                </Link>,
                <div>
                  {" "}
                  <ShoppingCartOutlined className="text-success mb-2" />
                  {product.quantity < 1 ? (
                    <p className="text-danger">out of stock</p>
                  ) : (
                    <Tooltip title={tooltipTitle}>
                      <p
                        onClick={() => {
                          addToCartHandler(product);
                        }}
                      >
                        Add to Cart
                      </p>
                    </Tooltip>
                  )}
                </div>,
              ]
        }
      >
        <Meta
          title={
            <div>
              <span>{product.title}</span>{" "}
              <h5 className="float-end text-dark">
                <sup>$</sup>
                {`${product.price}`}
              </h5>
            </div>
          }
          className="text-start w-100 d-inline-block"
          description={product.description.substring(0, 25) + " ..."}
        />
      </Card>
    </>
  );
};

export default HomeProductCard;
