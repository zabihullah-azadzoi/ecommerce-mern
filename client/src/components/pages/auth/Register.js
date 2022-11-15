import { useState } from "react";

import { auth } from "../../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const authSettings = {
        url: process.env.REACT_APP_REGISTRATION_REDIRECT_URL,
        handleCodeInApp: true,
      };
      const data = await auth.sendSignInLinkToEmail(email, authSettings);
      console.log("registration form", data);
      toast.success(
        "Email has been sent to your account, please click on the link to continue registration!"
      );
      window.localStorage.setItem("userRegistrationEmail", email);
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Register</h1>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-raised mt-2 float-end">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
