import { useState, useEffect } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";
import { useParams, useHistory } from "react-router-dom";

import {
  getCategory,
  updateCategory,
} from "../../../../functions/categoryFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.user);
  const { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    getCategory(slug)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((e) => toast.error(e.response.data.error));
  }, [slug]);

  const updateCategoryHandler = (e) => {
    e.preventDefault();
    updateCategory(user.token, slug, name)
      .then((res) => {
        toast.success("updated Successfully");
        history.push("/admin/category");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2">
          <AdminNavbar />
        </div>
        <div className="col">
          <h3>Update Category</h3>
          <form onSubmit={updateCategoryHandler}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="btn btn-dark mt-2 ">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
