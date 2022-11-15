import { useState } from "react";
import { auth } from "../../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);
  if (user && user.token) {
    history.push("/");
  }
  const passwordResetHandler = async (e) => {
    e.preventDefault();
    try {
      const authSettings = {
        url: process.env.REACT_APP_RESET_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
      };
      await auth.sendPasswordResetEmail(email, authSettings);
      toast.success("Password reset link has been send to your account.");
      setEmail("");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <div className="row">
        <h2>Forgot Password</h2>
        <form onSubmit={passwordResetHandler}>
          <input
            placeholder="Enter your email for reset link"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          <button className="btn btn-raised float-end mt-2">Send Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
