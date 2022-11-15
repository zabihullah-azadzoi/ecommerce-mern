import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import RedirectCountdown from "./RedirectCountdown";

const UserProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user.token ? (
    <Route {...rest} />
  ) : (
    <h1 className="text-danger p-5">
      <RedirectCountdown />
    </h1>
  );
};

export default UserProtectedRoute;
