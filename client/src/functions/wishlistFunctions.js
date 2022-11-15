import axios from "axios";

export const addToWishlist = async (authtoken, productId) => {
  return axios.post(
    "http://localhost:8000/api/user/wishlist",
    { productId },
    {
      headers: { authtoken },
    }
  );
};

export const removeFromWishlist = async (authtoken, productId) => {
  return axios.patch(
    `http://localhost:8000/api/user/wishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );
};

export const getWishlist = async (authtoken) => {
  return axios.get("http://localhost:8000/api/user/wishlist/", {
    headers: { authtoken },
  });
};
