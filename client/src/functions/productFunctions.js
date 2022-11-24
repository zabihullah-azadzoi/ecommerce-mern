import axios from "axios";

export const createProduct = async (authtoken, product) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/product`,
    product,
    {
      headers: { authtoken },
    }
  );
};

export const getCategorySubs = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/api/product/subs/${id}`,
    {}
  );
};

export const getAllProducts = async (limit, page, sort) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/api/products/?limit=${limit}&page=${page}&sort=${sort}`
  );
};

export const getProduct = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/api/product/${slug}`
  );
};

export const getProductsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/products/count`);
};

export const deleteProduct = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/product/${slug}`,
    {
      headers: { authtoken },
    }
  );
};

export const updateProduct = async (authtoken, product, slug) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/api/product/${slug}`,
    {
      product,
    },
    {
      headers: { authtoken },
    }
  );
};

export const ratingProduct = async (authtoken, productId, ratingStars) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/api/product/rating/${productId}`,
    {
      rating: ratingStars,
    },
    {
      headers: { authtoken },
    }
  );
};

export const filterProducts = async (arg) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/products/search`,
    {
      query: arg,
    }
  );
};
