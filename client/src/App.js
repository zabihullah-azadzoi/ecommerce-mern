import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

//components
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/Home";
import Header from "./components/nav/Header";
import CompleteRegistration from "./components/pages/auth/RegisterCompletion";
import ForgotPassword from "./components/pages/auth/ForgotPassword";
import UserHitory from "./components/pages/user/UserHistory";
import UserUpdatePassword from "./components/pages/user/UserUpdatePassword";
import UserWishlist from "./components/pages/user/UserWishlist";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCategory from "./components/pages/admin/category/UpdateCategory";
import CreateSub from "./components/pages/admin/sub/CreateSub";
import UpdateSub from "./components/pages/admin/sub/UpdateSub";
import CreateProduct from "./components/pages/admin/product/CreateProduct";

//protected routes
import UserProtectedRoute from "./components/protectedRoutes/UserRoute";
import AdminProtectedRoute from "./components/protectedRoutes/AdminRoute";

import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./functions/authFunctions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGIN",
              payload: {
                name: res.data.user.name,
                email: res.data.user.email,
                token: idTokenResult.token,
                role: res.data.user.role,
                _id: res.data.user._id,
              },
            });
          })
          .catch((e) => {
            toast.error(e.message);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <ToastContainer theme="colored" />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/register/complete" component={CompleteRegistration} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <UserProtectedRoute path="/user/history" component={UserHitory} />
        <UserProtectedRoute
          path="/user/update-password"
          component={UserUpdatePassword}
        />
        <UserProtectedRoute path="/user/wishlist" component={UserWishlist} />
        <AdminProtectedRoute
          path="/admin/dashboard"
          component={AdminDashboard}
        />
        <AdminProtectedRoute
          path="/admin/category"
          component={CreateCategory}
          exact
        />
        <AdminProtectedRoute
          path="/admin/category/:slug"
          component={UpdateCategory}
          exact
        />
        <AdminProtectedRoute path="/admin/sub" component={CreateSub} exact />
        <AdminProtectedRoute
          path="/admin/sub/:slug"
          component={UpdateSub}
          exact
        />
        <AdminProtectedRoute
          path="/admin/product"
          component={CreateProduct}
          exact
        />
      </Switch>
    </>
  );
};

export default App;
