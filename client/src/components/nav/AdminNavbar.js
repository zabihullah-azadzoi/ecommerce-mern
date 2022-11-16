import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="container-fluid">
      <ul className="navbar-nav border-end border-info ">
        <li className="nav-item ">
          <Link to="/admin/dashboard" className="nav-link">
            DASHBOARD
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/admin/product" className="nav-link">
            PRODUCT
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/admin/products" className="nav-link">
            PRODUCTS
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/admin/category" className="nav-link">
            CATEGORY
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/admin/sub" className="nav-link">
            SUB CATEGORY
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/admin/coupon" className="nav-link">
            COUPON
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/admin/update-password" className="nav-link">
            PASSWORD
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
