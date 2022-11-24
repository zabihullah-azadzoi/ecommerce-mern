import axios from "axios";

export const addToWishlist = async (authtoken, productId) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/api/user/wishlist`,
    { productId },
    {
      headers: { authtoken },
    }
  );
};

export const removeFromWishlist = async (authtoken, productId) => {
  return axios.patch(
    `${process.env.REACT_APP_API_URL}/api/user/wishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );
};

export const getWishlist = async (authtoken) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/user/wishlist`, {
    headers: { authtoken },
  });
};
