import { Button } from "antd";
import { LoadingOutlined, GoogleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const LoginForm = ({
  loginHandler,
  googleLoginHandler,
  email,
  password,
  setEmail,
  setPassword,
  emailAuthIsLoading,
  googleAuthIsLoading,
}) => {
  return (
    <form onSubmit={loginHandler}>
      <input
        type="email"
        className="form-control mt-5 border-bottom border-0 shadow-sm"
        value={email}
        placeholder="Enter your email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mt-4 border-bottom border-0 shadow-sm"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/forgot-password">
        <p className="text-danger float-end mt-3">Forgot Password</p>
      </Link>
      <Button
        onClick={loginHandler}
        type="primary"
        block
        loading={emailAuthIsLoading}
        shape="round"
        size="large"
        className="mt-2"
        disabled={!email || password.length < 6}
      >
        Log In
      </Button>
      <p className="text-dark text-center mt-4">or sign in with</p>
      <div className="text-center">
        {googleAuthIsLoading ? (
          <LoadingOutlined />
        ) : (
          <Button
            onClick={googleLoginHandler}
            type="danger"
            shape="circle"
            size="large"
            className="mt-2 "
            icon={<GoogleOutlined />}
            loading={googleAuthIsLoading}
          />
        )}
      </div>
    </form>
  );
};

export default LoginForm;
