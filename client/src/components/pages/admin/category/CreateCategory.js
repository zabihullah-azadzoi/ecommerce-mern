import { useState, useEffect } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";
import CreateCategoryForm from "../../../forms/CreateCategoryForm";

import { Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../../../../functions/categoryFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    renderAllCategories();
  }, []);

  const renderAllCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  const createCategoryHandler = (e) => {
    e.preventDefault();
    createCategory(user.token, name, image.image)
      .then((res) => {
        setName("");
        toast.success(`${res.data.name} created Succefully!`);
        renderAllCategories();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  const deleteCategoryHandler = (slug) => {
    deleteCategory(user.token, slug)
      .then((res) => {
        toast.success(`${res.data.name} successfully deleted!`);
        renderAllCategories();
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  //modal
  const showConfirm = (slug, name) => {
    Modal.confirm({
      title: `Do you Want to delete ${name} category?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteCategoryHandler(slug);
      },
    });
  };
  //search filter
  const searchFilter = (search) => (categ) =>
    categ.name.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 p-0">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4 className="mt-3 mb-5 ">Create new Category</h4>
          <div className="row">
            <div className="col-md-8 offset-md-2 mb-5">
              <Card>
                <CreateCategoryForm
                  createCategoryHandler={createCategoryHandler}
                  name={name}
                  setName={setName}
                  image={image}
                  setImage={setImage}
                />
                <br />
                <br />
                <input
                  type="search"
                  className="form-control mt-3 mb-5 border-bottom border-0"
                  placeholder="Search Category"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {categories.length > 0 &&
                  categories.filter(searchFilter(search)).map((cat) => {
                    return (
                      <p
                        style={{ fontSize: "20px" }}
                        className="text-dark bg-light p-2 "
                        key={cat._id}
                      >
                        {cat.name}
                        <Link to={`/admin/category/${cat.slug}`}>
                          <EditOutlined
                            className="float-end ps-3 text-dark"
                            role="button"
                          />
                        </Link>
                        <DeleteOutlined
                          className="float-end text-dark"
                          role="button"
                          onClick={() => showConfirm(cat.slug, cat.name)}
                        />
                      </p>
                    );
                  })}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
