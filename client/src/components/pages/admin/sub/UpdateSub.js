import { useState, useEffect } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";
import { getAllCategories } from "../../../../functions/categoryFunctions";
import { updateSub, getSub } from "../../../../functions/subFunctions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { useParams, useHistory } from "react-router-dom";

const UpdateSub = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [parent, setParent] = useState("");
  const { slug } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => toast.error(error.response.data.error));

    getSub(slug)
      .then((res) => {
        setName(res.data.name);
        setParent(res.data.parent);
      })
      .catch((e) => toast.error(e.response.data.error));
  }, [slug]);

  const updateSubHandler = (e) => {
    e.preventDefault();
    updateSub(user.token, slug, name, parent)
      .then((res) => {
        toast.success(`${res.data.name} updated successfully.`);
        setName("");
        setParent("");
        history.push("/admin/sub");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h3>Update sub category</h3>
          <br />
          <form onSubmit={updateSubHandler}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className="form-control border-bottom border-0"
                name="name"
                required
                placeholder="Enter new sub category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />

              <label htmlFor="categories" className="form-label">
                Select Category
              </label>
              <select
                name="categories"
                required
                className="form-control"
                //  defaultValue={categories.find((cat) => cat._id === parent)}
                onChange={(e) => setParent(e.target.value)}
              >
                <option value=""></option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                      selected={cat._id === parent}
                    >
                      {cat.name}
                    </option>
                  ))}
              </select>
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

export default UpdateSub;
