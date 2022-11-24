import errorImage from "../../../assets/404.jpg";

import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center flex-column"
      style={{ height: "97vh", backgroundColor: "#fff" }}
    >
      <img
        src={errorImage}
        alt="page not found!"
        style={{ width: "25rem", height: "auto" }}
      />
      <p
        className="text-center text-light pt-3 pb-3 ps-5 pe-5  h3"
        style={{ backgroundColor: "#007DFE", borderRadius: "5rem" }}
      >
        This page is outside of the Galaxy!
      </p>
      <button className="btn m-3 btn-lg" style={{ backgroundColor: "#007DFE" }}>
        <Link to="/" className="text-light">
          {" "}
          {"< Go back Home"}
        </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
