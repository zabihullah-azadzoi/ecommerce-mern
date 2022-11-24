import axios from "axios";

export const getCategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/api/category/${slug}`,
    {}
  );
};

export const getAllCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`, {});
};

export const createCategory = async (authtoken, name, coverPhoto) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/category`,
    { name, coverPhoto },
    {
      headers: { authtoken },
    }
  );
};

export const updateCategory = async (authtoken, slug, name) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/api/category/${slug}`,
    { name },
    {
      headers: { authtoken },
    }
  );
};
export const deleteCategory = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/category/${slug}`,
    {
      headers: { authtoken },
    }
  );
};
