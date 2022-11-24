import axios from "axios";

export const imageUpload = async (authtoken, image) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/cloudinary/image`,
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
    `${process.env.REACT_APP_API_URL}/api/cloudinary/image/${imageId}`,
    {
      headers: { authtoken },
    }
  );
};
