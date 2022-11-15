import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { auth, googleAuthProvider } from "../../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import {
  createOrUpdateUser,
  roleBasedRedirect,
} from "../../../functions/authFunctions";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("zabihullahazadzoi848249@gmail.com");
  const [password, setPassword] = useState("zabih12345");
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      if (result.user) {
        const user = result.user;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(history, res.data.user.role);
            // history.push("/");
          })
          .catch((e) => {
            toast.error(e.response.data.error);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const googleLoginHandler = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      if (result.user) {
        const idTokenResult = await result.user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
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
            history.push("/");
          })
          .catch((e) => {
            toast.error(e.response.data.error);
          });
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Login</h1>
          <form onSubmit={loginHandler}>
            <input
              type="email"
              className="form-control mt-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={loginHandler}
              type="primary"
              block
              shape="round"
              size="large"
              className="mt-2"
              disabled={!email || password.length < 6}
            >
              Login with Email/Password
            </Button>
            <Button
              onClick={googleLoginHandler}
              type="danger"
              block
              shape="round"
              size="large"
              className="mt-2"
            >
              Login with Google
            </Button>
            <Link to="/forgot-password">
              <p className="text-danger float-end mt-2">Forgot Password</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
