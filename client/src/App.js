import { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./functions/authFunctions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { LoadingOutlined } from "@ant-design/icons";

//components

// import Login from "./components/pages/auth/Login";   ---> normal loading
const Login = lazy(() => import("./components/pages/auth/Login")); // ---> lazy loading
const Register = lazy(() => import("./components/pages/auth/Register"));
const Home = lazy(() => import("./components/pages/home/Home"));
const Shop = lazy(() => import("./components/pages/shop/Shop"));
const Header = lazy(() => import("./components/nav/Header"));
const CompleteRegistration = lazy(() =>
  import("./components/pages/auth/RegisterCompletion")
);
const ForgotPassword = lazy(() =>
  import("./components/pages/auth/ForgotPassword")
);
const UserHistory = lazy(() => import("./components/pages/user/UserHistory"));
const UserUpdatePassword = lazy(() =>
  import("./components/pages/user/UserUpdatePassword")
);
const UserWishlist = lazy(() => import("./components/pages/user/UserWishlist"));
const AdminDashboard = lazy(() =>
  import("./components/pages/admin/AdminDashboard")
);
const UpdateAdminPassword = lazy(() =>
  import("./components/pages/admin/password/UpdateAdminPassword")
);
const CreateCategory = lazy(() =>
  import("./components/pages/admin/category/CreateCategory")
);
const UpdateCategory = lazy(() =>
  import("./components/pages/admin/category/UpdateCategory")
);
const CreateSub = lazy(() => import("./components/pages/admin/sub/CreateSub"));
const UpdateSub = lazy(() => import("./components/pages/admin/sub/UpdateSub"));
const CreateProduct = lazy(() =>
  import("./components/pages/admin/product/CreateProduct")
);

const ProductList = lazy(() =>
  import("./components/pages/admin/product/ProductList")
);
const UpdateProduct = lazy(() =>
  import("./components/pages/admin/product/UpdateProduct")
);
const Product = lazy(() => import("./components/pages/home/product/Product"));
const Category = lazy(() => import("./components/pages/category/Category"));
const Sub = lazy(() => import("./components/pages/sub/Sub"));
const Cart = lazy(() => import("./components/pages/cart/Cart"));
const Checkout = lazy(() => import("./components/pages/checkout/Checkout"));

const CartDrawer = lazy(() => import("./components/drawer/CartDrawer"));
const CreateCoupon = lazy(() =>
  import("./components/pages/admin/coupon/CreateCoupon")
);
const Payment = lazy(() => import("./components/pages/payment/Payment"));

//protected routes
const UserProtectedRoute = lazy(() =>
  import("./components/protectedRoutes/UserRoute")
);
const AdminProtectedRoute = lazy(() =>
  import("./components/protectedRoutes/AdminRoute")
);

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
    <Suspense
      fallback={
        <div className="col text-center mt-4 d-flex justify-content-center align-items-center">
          ___ React Redux EC
          <LoadingOutlined />
          MMERCE ___
        </div>
      }
    >
      <Header></Header>

      <CartDrawer />
      <ToastContainer theme="colored" />
      <Switch>
        {/* home routes */}
        <Route path="/" component={Home} exact />

        <Route path="/shop" component={Shop} exact />

        <Route path="/cart" component={Cart} exact />

        <Route path="/product/:slug" component={Product} exact />

        <Route path="/category/:slug" component={Category} exact />

        <Route path="/sub/:slug" component={Sub} exact />

        <Route path="/register" component={Register} exact />
        <Route path="/register/complete" component={CompleteRegistration} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />

        <UserProtectedRoute path="/user/history" component={UserHistory} />

        <UserProtectedRoute
          path="/user/update-password"
          component={UserUpdatePassword}
        />

        <UserProtectedRoute path="/user/wishlist" component={UserWishlist} />

        <UserProtectedRoute path="/cart/checkout" component={Checkout} />

        <UserProtectedRoute path="/cart/payment" component={Payment} />

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

        <AdminProtectedRoute
          path="/admin/products"
          component={ProductList}
          exact
        />

        <AdminProtectedRoute
          path="/admin/product/:slug"
          component={UpdateProduct}
          exact
        />
        <AdminProtectedRoute
          path="/admin/coupon"
          component={CreateCoupon}
          exact
        />

        <AdminProtectedRoute
          path="/admin/update-password"
          component={UpdateAdminPassword}
          exact
        />
      </Switch>
    </Suspense>
  );
};

export default App;
