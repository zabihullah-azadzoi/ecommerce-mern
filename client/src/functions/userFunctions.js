import axios from "axios";

export const createOrUpdateUser = async (authToken, userData) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/create-update-user`,
    { userData },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const updateUserAddress = async (authtoken, address) => {
  return await axios.patch(
    `${process.env.REACT_APP_API_URL}/api/user/address`,
    {
      address,
    },
    {
      headers: { authtoken },
    }
  );
};

export const getAllUsers = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
    headers: { authtoken },
  });
};
