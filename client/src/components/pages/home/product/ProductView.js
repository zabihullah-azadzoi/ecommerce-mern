import { useState, useEffect } from "react";

import { Card, Tabs, Modal } from "antd";
import StarRatings from "react-star-ratings";
import { ratingProduct } from "../../../../functions/productFunctions";
import { addToWishlist } from "../../../../functions/wishlistFunctions";
import AverageRating from "../AverageRating";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  HeartOutlined,
  StarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

import ProductInfoList from "./ProductInfoList";

const defaultImage = require("../../../../assets/default-product.png");

const ProductView = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const user = useSelector((state) => state.user);
  const history = useHistory();
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

  //restoring user's old rating, if exists
  useEffect(() => {
    if (product.ratings && product.ratings.length > 0 && user) {
      const userOldRating = product.ratings.find(
        (rating) => rating.postedBy === user._id
      );
      if (userOldRating) setRatingStars(parseInt(userOldRating.star));
    }
  }, [user, product]);

  const ModalHandler = () => {
    if (!user || !user.token) {
      history.push({
        pathname: "/login",
        state: { from: `/product/${product.slug}` },
      });
    } else {
      setOpenModal(true);
    }
  };

  const ratingSubmitHandler = () => {
    setOpenModal(false);

    ratingProduct(user.token, product._id, ratingStars)
      .then((res) => {
        toast.success("Thanks for your rating, it will appear soon..");
      })
      .catch((e) => {
        toast.error(e.response ? e.response.data.error : e);
      });
  };

  const addToWishlistHandler = (productId) => {
    addToWishlist(user.token, productId)
      .then((res) => {
        if (res.data.ok) toast.success("Product added to Wishlist");
      })
      .catch((e) => {
        toast.error(e.response ? e.response.data.error : e);
      });
  };

  return (
    <>
      <div className="row text-center">
        <div className="col-md-7">
          {/* product images carousel */}
          <Carousel className="text-center" autoPlay="true" infiniteLoop="true">
            {product && product.images.length > 0 ? (
              product.images.map((image) => {
                return (
                  <div key={image.public_id}>
                    <img src={image.url} alt={image.url} />
                  </div>
                );
              })
            ) : (
              <div>
                <img src={defaultImage} alt="Not available" />
              </div>
            )}
          </Carousel>
          <Tabs
            defaultActiveKey="1"
            type="card"
            className="text-start"
            items={[
              {
                label: "Description",
                key: "description",
                children: product.description,
              },
              {
                label: "More",
                key: "more",
                children: " For more information contact us on xxxx xxx xxx",
              },
            ]}
          ></Tabs>
        </div>
        <div className="col-md-5">
          <h3 className="bg-primary text-light text-center p-4">
            {product.title}
          </h3>
          {/* average product component */}
          <AverageRating product={product} />
          <Card
            className=" mb-3 d-inline-block"
            style={{ width: "100%" }}
            cover={<ProductInfoList product={product} />} //product info list rendering
            actions={[
              <div onClick={() => addToWishlistHandler(product._id)}>
                {" "}
                <HeartOutlined className="text-info mb-2" />
                <p>Add to Wishlist</p>
              </div>,
              <div>
                {" "}
                <ShoppingCartOutlined className="text-success mb-2" />
                {product.quantity < 1 ? (
                  <p className="text-danger">out of stock</p>
                ) : (
                  <p
                    onClick={() => {
                      addToCartHandler(product);
                    }}
                  >
                    Add to Cart
                  </p>
                )}
              </div>,
              <div>
                <div>
                  {" "}
                  <StarOutlined className="text-success mb-2" />
                  <p onClick={ModalHandler}>
                    {user && user.token
                      ? "Leave Rating"
                      : "Login to leave rating"}
                  </p>
                  <Modal
                    title="Leave your rating for this product"
                    open={openModal}
                    centered={true}
                    onCancel={() => setOpenModal(false)}
                    onOk={ratingSubmitHandler}
                  >
                    <StarRatings
                      rating={ratingStars}
                      starDimension="40px"
                      starSpacing="15px"
                      starRatedColor="red"
                      changeRating={(rating) => setRatingStars(rating)}
                      numberOfStars={5}
                      name="rating"
                    ></StarRatings>
                  </Modal>
                </div>
              </div>,
            ]}
          ></Card>
        </div>
      </div>
    </>
  );
};

export default ProductView;
