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
