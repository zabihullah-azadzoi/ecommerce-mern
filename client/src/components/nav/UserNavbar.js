import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="container-fluid">
      <ul className="navbar-nav border-end border-info ">
        <li className="nav-item mb-2">
          <Link to="/user/history" className="nav-link">
            History
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/user/update-password" className="nav-link">
            Update Password
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/user/wishlist" className="nav-link">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
