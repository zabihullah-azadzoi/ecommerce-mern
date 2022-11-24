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
      await auth.sendSignInLinkToEmail(email, authSettings);
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
      <div className="row justify-content-center">
        <div className="col-md-5 card p-5">
          <h3>Register</h3>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="form-control mt-5 border-bottom border-0 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-4 float-end">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
