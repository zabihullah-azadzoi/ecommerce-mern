import axios from "axios";

export const imageUpload = async (authtoken, image) => {
  return await axios.post(
    "http://localhost:8000/api/product/image",
    {
      image,
    },
    {
      headers: { authtoken },
    }
  );
};

export const imageRemove = async (authtoken, imageId) => {
  return await axios.delete(
    `http://localhost:8000/api/product/image/${imageId}`,
    {
      headers: { authtoken },
    }
  );
};
