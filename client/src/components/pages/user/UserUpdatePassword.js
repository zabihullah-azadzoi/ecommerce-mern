import { useState } from "react";
import UserNavbar from "../../nav/UserNavbar";

import { auth } from "../../../firebase";
import { toast } from "react-toastify";

const UserUpdatePassword = () => {
  const [password, setPassword] = useState("");

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    auth.currentUser
      .updatePassword(password)
      .then((user) => {
        toast.success("Password has been successfully updated.");
        setPassword("");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 p-0">
          <UserNavbar />
        </div>
        <div className="col-md-4">
          <h2>Update Password</h2>
          <form className="form" onSubmit={updatePasswordHandler}>
            <div className="form-group">
              <label htmlFor="user-password">Your password</label>
              <input
                name="user-password"
                type="password"
                className="form-control"
                placeholder="Enter new Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={password.length < 6}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdatePassword;
