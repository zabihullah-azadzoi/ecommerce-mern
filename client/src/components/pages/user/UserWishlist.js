import { useState, useEffect, useCallback } from "react";

import UserNavbar from "../../nav/UserNavbar";
import HomeProductCard from "../../cards/HomeProductCard";
import { toast } from "react-toastify";
import {
  getWishlist,
  removeFromWishlist,
} from "../../../functions/wishlistFunctions";
import { useSelector } from "react-redux";

const UserWishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  const user = useSelector((state) => state.user);

  const renderWishlistProducts = useCallback(() => {
    getWishlist(user.token)
      .then((res) => setWishlistProducts(res.data.wishlist))
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, [user]);

  useEffect(() => {
    renderWishlistProducts();
  }, [renderWishlistProducts]);

  const removeFromWishlistHandler = (productId) => {
    removeFromWishlist(user.token, productId)
      .then((res) => {
        if (res.data.ok) toast.success("Product removed from wishlist");
        renderWishlistProducts();
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 ">
          <UserNavbar />
        </div>
        <div className="col-md-10">
          <h5 className="text-center mt-3 mb-5">Products in your Wishlist</h5>
          <div className="row">
            {wishlistProducts.length > 0 &&
              wishlistProducts.map((product) => {
                return (
                  <div className="col-md-4 text-center" key={product._id}>
                    <HomeProductCard
                      product={product}
                      wishlist={true}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWishlist;
