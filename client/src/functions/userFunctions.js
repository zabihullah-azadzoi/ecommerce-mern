import axios from "axios";

export const updateUserAddress = async (authtoken, address) => {
  return await axios.patch(
    "http://localhost:8000/api/user/address",
    {
      address,
    },
    {
      headers: { authtoken },
    }
  );
};
