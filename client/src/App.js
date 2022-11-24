import { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./functions/authFunctions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { LoadingOutlined } from "@ant-design/icons";

import { ProSidebarProvider } from "react-pro-sidebar";

import { getSettings } from "./functions/settingsFunctions";

const Footer = lazy(() => import("./components/footer/Footer"));

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

const UserWishlist = lazy(() => import("./components/pages/user/UserWishlist"));

const AdminDashboard = lazy(() =>
  import("./components/pages/admin/AdminDashboard")
);
const Orders = lazy(() => import("./components/pages/admin/orders/Orders"));
const Profile = lazy(() => import("./components/pages/profile/Profile"));
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
const CreateCoupon = lazy(() =>
  import("./components/pages/admin/coupon/CreateCoupon")
);
const UsersList = lazy(() =>
  import("./components/pages/admin/users/UsersList")
);
const Settings = lazy(() =>
  import("./components/pages/admin/settings/Settings")
);

const Product = lazy(() => import("./components/pages/home/product/Product"));
const Category = lazy(() => import("./components/pages/category/Category"));
const Sub = lazy(() => import("./components/pages/sub/Sub"));
const Cart = lazy(() => import("./components/pages/cart/Cart"));
const Checkout = lazy(() => import("./components/pages/checkout/Checkout"));

const CartDrawer = lazy(() => import("./components/drawer/CartDrawer"));

const Payment = lazy(() => import("./components/pages/payment/Payment"));

const ErrorPage = lazy(() => import("./components/pages/404/ErrorPage"));

//protected routes
const UserProtectedRoute = lazy(() =>
  import("./components/protectedRoutes/UserRoute")
);
const AdminProtectedRoute = lazy(() =>
  import("./components/protectedRoutes/AdminRoute")
);

const App = () => {
  const dispatch = useDispatch();

  // setting html page's title, description and logo
  useEffect(() => {
    getSettings()
      .then((res) => {
        if (!res.data || typeof window === "undefined") return;

        if (res.data.name) window.document.title = res.data.name;
        if (res.data.description) {
          window.document
            .getElementsByTagName("meta")
            .namedItem("description")
            .setAttribute("content", res.data.description);
        }
        if (res.data.logo) {
          window.document.querySelector('link[rel="icon"]').href =
            res.data.logo.url;
        }
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, []);

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
                image: res.data.user.image && res.data.user.image.url,
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
    <ProSidebarProvider>
      <Suspense
        fallback={
          <div className="col text-center mt-4 d-flex justify-content-center align-items-center">
            ___ React Redux EC
            <LoadingOutlined />
            MMERCE ___
          </div>
        }
      >
        <div className="content-container">
          <Header></Header>

          <CartDrawer />
          <ToastContainer theme="colored" style={{ zIndex: "11000" }} />
          <div style={{ paddingTop: "3rem" }}>
            <Switch>
              {/* home routes */}
              <Route path="/" component={Home} exact />

              <Route path="/shop" component={Shop} exact />

              <Route path="/cart" component={Cart} exact />

              <Route path="/product/:slug" component={Product} exact />

              <Route path="/category/:slug" component={Category} exact />

              <Route path="/sub/:slug" component={Sub} exact />

              <Route path="/register" component={Register} exact />
              <Route
                path="/register/complete"
                component={CompleteRegistration}
                exact
              />
              <Route path="/login" component={Login} exact />
              <Route path="/forgot-password" component={ForgotPassword} exact />

              <UserProtectedRoute
                path="/user/history"
                component={UserHistory}
                exact
              />

              <UserProtectedRoute
                path="/user/profile"
                component={Profile}
                exact
              />

              <UserProtectedRoute
                path="/user/wishlist"
                component={UserWishlist}
                exact
              />

              <UserProtectedRoute
                path="/cart/checkout"
                component={Checkout}
                exact
              />

              <UserProtectedRoute
                path="/cart/payment"
                component={Payment}
                exact
              />

              <AdminProtectedRoute
                path="/admin/dashboard"
                component={AdminDashboard}
                exact
              />

              <AdminProtectedRoute
                path="/admin/orders"
                component={Orders}
                exact
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
              <AdminProtectedRoute
                path="/admin/sub"
                component={CreateSub}
                exact
              />

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
                path="/admin/users"
                component={UsersList}
                exact
              />

              <AdminProtectedRoute
                path="/admin/settings"
                component={Settings}
                exact
              />

              <AdminProtectedRoute
                path="/admin/profile"
                component={Profile}
                exact
              />
              <Route path="*" component={ErrorPage} exact />
            </Switch>
          </div>
        </div>
        <footer className="footer--pin">
          <Footer />
        </footer>
      </Suspense>
    </ProSidebarProvider>
  );
};

export default App;
