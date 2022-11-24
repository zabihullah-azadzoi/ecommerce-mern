import { useState } from "react";
import { useHistory } from "react-router-dom";

import { auth, googleAuthProvider } from "../../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  createOrUpdateUser,
  roleBasedRedirect,
} from "../../../functions/authFunctions";
import LoginForm from "../../forms/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("zabihullahazadzoi848249@gmail.com");
  const [password, setPassword] = useState("zabih12345");
  const [emailAuthIsLoading, setEmailAuthIsLoading] = useState(false);
  const [googleAuthIsLoading, setGoogleAuthIsLoading] = useState(false);
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setEmailAuthIsLoading(true);
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
                image: res.data.user.image && res.data.user.image.url,
                role: res.data.user.role,
                _id: res.data.user._id,
              },
            });

            setEmailAuthIsLoading(false);
            roleBasedRedirect(history, res.data.user.role);
            // history.push("/");
          })
          .catch((e) => {
            setEmailAuthIsLoading(false);
            toast.error(e.response.data.error);
          });
      }
    } catch (error) {
      setEmailAuthIsLoading(false);
      toast.error(error.message);
    }
  };
  const googleLoginHandler = async () => {
    try {
      setGoogleAuthIsLoading(true);
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
                image: res.data.user.image && res.data.user.image.url,
                _id: res.data.user._id,
              },
            });
            setGoogleAuthIsLoading(false);
            history.push("/");
          })
          .catch((e) => {
            setGoogleAuthIsLoading(false);
            toast.error(e.response.data.error);
          });
      }
    } catch (e) {
      setGoogleAuthIsLoading(false);
      toast.error(e.message);
    }
  };

  return (
    <div className="container p-5 ">
      <div className="row justify-content-center">
        <div className="col-md-5 card p-5">
          <h3>Login</h3>
          <LoginForm
            loginHandler={loginHandler}
            googleLoginHandler={googleLoginHandler}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            emailAuthIsLoading={emailAuthIsLoading}
            googleAuthIsLoading={googleAuthIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
