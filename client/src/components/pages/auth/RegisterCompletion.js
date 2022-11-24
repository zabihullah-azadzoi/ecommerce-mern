import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../../functions/authFunctions";

const CompleteRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (user && user.token) {
    history.push("/");
  }

  useEffect(() => {
    setEmail(window.localStorage.getItem("userRegistrationEmail"));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please Provide email and password!");
      return;
    }
    if (password.length < 6) {
      toast.error("password length can not be less than 6 characters!");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        toast.success("Registration was successfull.");
        window.localStorage.removeItem("userRegistrationEmail");

        const currentUser = auth.currentUser;
        await currentUser.updatePassword(password);
        const userIdTokenResult = await currentUser.getIdTokenResult();
        createOrUpdateUser(userIdTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGIN",
              payload: {
                name: res.data.user.name,
                email: res.data.user.email,
                token: userIdTokenResult.token,
                image: res.data.user.image && res.data.user.image.url,
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
          <h1>Register Completion</h1>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              className="form-control mt-3"
              value={email}
              disabled
            />
            <input
              type="password"
              className="form-control mt-3"
              value={password}
              placeholder="Type your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-raised mt-2 float-end">
              Complete Registeration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistration;
