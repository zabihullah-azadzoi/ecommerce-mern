import axios from "axios";

export const updateSettings = async (authtoken, settings) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/api/settings`,
    { settings },
    { headers: { authtoken } }
  );
};

export const getSettings = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/settings`);
};
