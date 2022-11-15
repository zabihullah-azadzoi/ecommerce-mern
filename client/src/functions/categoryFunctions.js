import axios from "axios";

export const getCategory = async (slug) => {
  return await axios.get(`http://localhost:8000/api/category/${slug}`, {});
};

export const getAllCategories = async () => {
  return await axios.get("http://localhost:8000/api/categories", {});
};

export const createCategory = async (authtoken, categoryName) => {
  return await axios.post(
    "http://localhost:8000/api/category",
    { name: categoryName },
    {
      headers: { authtoken },
    }
  );
};

export const updateCategory = async (authtoken, slug, name) => {
  return await axios.put(
    `http://localhost:8000/api/category/${slug}`,
    { name },
    {
      headers: { authtoken },
    }
  );
};
export const deleteCategory = async (authtoken, slug) => {
  return await axios.delete(`http://localhost:8000/api/category/${slug}`, {
    headers: { authtoken },
  });
};
