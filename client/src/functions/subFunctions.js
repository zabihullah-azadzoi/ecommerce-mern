import axios from "axios";

export const getAllSubs = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/api/subs`, {});
};

export const getSub = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/api/sub/${slug}`,
    {}
  );
};

export const createSub = async (authtoken, name, parent) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/sub`,
    { name, parent },
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const deleteSub = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/sub/${slug}`,
    {
      headers: { authtoken },
    }
  );
};

export const updateSub = async (authtoken, slug, name, parent) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/api/sub/${slug}`,
    { name, parent },
    {
      headers: { authtoken },
    }
  );
};
