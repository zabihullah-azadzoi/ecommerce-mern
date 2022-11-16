import { useState } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";

import { auth } from "../../../../firebase";
import { toast } from "react-toastify";

const UpdateAdminPassword = () => {
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
        <div className=" col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-4">
          <h4 className="mt-3 mb-5">Update Password</h4>
          <form className="form" onSubmit={updatePasswordHandler}>
            <div className="form-group">
              <label htmlFor="user-password" className="form-label">
                Your password
              </label>
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
                className="btn btn-primary mt-4"
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

export default UpdateAdminPassword;
