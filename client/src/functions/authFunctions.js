import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    "http://localhost:8000/api/create-update-user",
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    "http://localhost:8000/api/current-user",
    {},
    {
      headers: {
        authtoken: authToken,
      },
    }
  );
};

export const currentAdmin = async (authToken) => {
  return await axios.post(
    "http://localhost:8000/api/admin",
    {},
    {
      headers: {
        authtoken: authToken,
      },
    }
  );
};

export const roleBasedRedirect = (history, role) => {
  if (history.location.state) {
    history.push(history.location.state.from);
  } else {
    if (role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  }
};
