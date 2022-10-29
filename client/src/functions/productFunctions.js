import axios from "axios";

export const createProduct = async (authtoken, product) => {
  return await axios.post("http://localhost:8000/api/product", product, {
    headers: { authtoken },
  });
};

export const getCategorySubs = async (id) => {
  return await axios.get(`http://localhost:8000/api/product/subs/${id}`, {});
};

export const getAllProducts = async (limit) => {
  return await axios.get(`http://localhost:8000/api/products/${limit}`);
};

export const getProduct = async (slug) => {
  return await axios.get(`http://localhost:8000/api/product/${slug}`);
};

export const deleteProduct = async (authtoken, slug) => {
  return await axios.delete(`http://localhost:8000/api/product/${slug}`, {
    headers: { authtoken },
  });
};

export const updateProduct = async (authtoken, product, slug) => {
  return await axios.put(
    `http://localhost:8000/api/product/${slug}`,
    {
      product,
    },
    {
      headers: { authtoken },
    }
  );
};
