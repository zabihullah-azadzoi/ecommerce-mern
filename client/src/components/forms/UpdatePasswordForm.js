import { LoadingOutlined } from "@ant-design/icons";

const UpdatePasswordForm = ({
  updatePasswordHandler,
  passwords,
  setPasswordsHandler,
  loading,
  userHasPassword,
}) => {
  return (
    <form className="form" onSubmit={updatePasswordHandler}>
      <div className="mb-3">
        <label htmlFor="oldPassword" className="form-label">
          Your old password
        </label>
        <input
          name="oldPassword"
          type="password"
          className="form-control"
          placeholder="Enter old Password"
          value={passwords.oldPassword}
          onChange={setPasswordsHandler}
          disabled={!userHasPassword}
          required
        />
      </div>
      <br />
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          New Password
        </label>
        <input
          name="newPassword"
          type="password"
          className="form-control"
          placeholder="Enter new Password"
          value={passwords.newPassword}
          onChange={setPasswordsHandler}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm new password
        </label>
        <input
          name="confirmPassword"
          type="password"
          className="form-control"
          placeholder="Enter new Password"
          value={passwords.confirmPassword}
          onChange={setPasswordsHandler}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={passwords.newPassword.length < 6 || loading}
      >
        {loading ? <LoadingOutlined /> : "Save"}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
