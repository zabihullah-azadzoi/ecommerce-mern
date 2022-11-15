import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import RedirectCountdown from "./RedirectCountdown";
import { currentAdmin } from "../../functions/authFunctions";
import { toast } from "react-toastify";

const AdminProtectedRoute = ({ children, ...rest }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setIsAvailable(true);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setIsAvailable(false);
          toast.error(e.response.data.message);
        });
    }
  }, [user]);
  return isAvailable && !loading ? (
    <Route {...rest} />
  ) : (
    <h1 className="text-danger p-5">
      <RedirectCountdown />
    </h1>
  );
};

export default AdminProtectedRoute;
