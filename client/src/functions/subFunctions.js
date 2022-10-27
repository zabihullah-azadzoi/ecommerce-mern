import axios from "axios";

export const getAllSubs = async () => {
  return await axios.get("http://localhost:8000/api/subs", {});
};

export const getSub = async (slug) => {
  return await axios.get(`http://localhost:8000/api/sub/${slug}`, {});
};

export const createSub = async (authtoken, name, parent) => {
  return await axios.post(
    "http://localhost:8000/api/sub",
    { name, parent },
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const deleteSub = async (authtoken, slug) => {
  return await axios.delete(`http://localhost:8000/api/sub/${slug}`, {
    headers: { authtoken },
  });
};

export const updateSub = async (authtoken, slug, name, parent) => {
  return await axios.put(
    `http://localhost:8000/api/sub/${slug}`,
    { name, parent },
    {
      headers: { authtoken },
    }
  );
};
