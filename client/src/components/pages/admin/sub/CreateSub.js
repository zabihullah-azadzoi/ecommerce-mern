import { useState, useEffect } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";
import { getAllCategories } from "../../../../functions/categoryFunctions";
import {
  createSub,
  getAllSubs,
  deleteSub,
} from "../../../../functions/subFunctions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const CreateSub = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [subs, setSubs] = useState("");
  const [parent, setParent] = useState("");
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  useEffect(() => {
    renderAllSubs();
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => toast.error(error.response.data.error));
  }, []);

  const renderAllSubs = () => {
    getAllSubs()
      .then((res) => setSubs(res.data))
      .catch((e) => toast.error(e.response.data.error));
  };

  const createSubHandler = (e) => {
    e.preventDefault();
    createSub(user.token, name, parent)
      .then((res) => {
        toast.success(`${name} created successfully.`);
        setName("");
        renderAllSubs();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const deleteSubHandler = (slug) => {
    deleteSub(user.token, slug)
      .then((res) => {
        toast.success(`${res.data.name} has been successfully deleted!`);
        renderAllSubs();
      })
      .catch((e) => toast.error(e.response.data.error));
  };

  //modal
  const showConfirm = (slug, name) => {
    Modal.confirm({
      title: `Do you Want to delete ${name} category?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteSubHandler(slug);
      },
    });
  };
  //search filter
  const searchFilter = (search) => (sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h3>Create a new sub category</h3>
          <form onSubmit={createSubHandler}>
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
                onChange={(e) => setParent(e.target.value)}
              >
                <option value=""></option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              <button type="submit" className="btn btn-dark mt-2 ">
                Save
              </button>
            </div>
          </form>
          <br />
          <br />
          <input
            type="search"
            className="form-control mt-3 mb-5 border-bottom border-0"
            placeholder="Search Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {subs.length > 0 &&
            subs.filter(searchFilter(search)).map((sub) => {
              return (
                <p
                  style={{ fontSize: "20px" }}
                  className="text-dark bg-light p-2 "
                  key={sub._id}
                >
                  {sub.name}
                  <Link to={`/admin/sub/${sub.slug}`}>
                    <EditOutlined
                      className="float-end ps-3 text-dark"
                      role="button"
                    />
                  </Link>
                  <DeleteOutlined
                    className="float-end text-dark"
                    role="button"
                    onClick={() => showConfirm(sub.slug, sub.name)}
                  />
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CreateSub;
