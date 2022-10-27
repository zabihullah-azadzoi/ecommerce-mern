import { useState, useEffect } from "react";

import AdminNavbar from "../../../nav/AdminNavbar";
import CreateProductForm from "../../../forms/CreateProductForm";
import ImagesUploadForm from "../../../forms/ImagesUploadForm";

import { createProduct } from "../../../../functions/productFunctions";
import { getAllCategories } from "../../../../functions/categoryFunctions";
import { getCategorySubs } from "../../../../functions/productFunctions";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  shipping: "",
  color: "",
  brand: "",
  category: "",
  subs: [],
  images: [],
};

const colors = ["Black", "White", "Red", "Silver", "Blue"];
const brands = ["Apple", "Samsung", "Hp", "Dell", "Toshiba"];

const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [allSubs, setAllSubs] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((e) => toast.error(e.response.data.error));
  }, []);

  //getting subs for a category
  const { category } = values;
  useEffect(() => {
    setValues((prevState) => ({ ...prevState, subs: [] }));
    if (category !== "") {
      getCategorySubs(category)
        .then((res) => setAllSubs(res.data))
        .catch((e) => toast.error(e.response.data.error));
    }
  }, [category]);

  const valuesChangeHandler = (e) => {
    setValues((preValues) => ({
      ...preValues,
      [e.target.name]: e.target.value,
    }));
  };

  const productFormSubmitHandler = (e) => {
    e.preventDefault();

    createProduct(user.token, values)
      .then((res) => {
        toast.success(`${res.data.title} created successfully.`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h3>Create new Product</h3>
          <ImagesUploadForm values={values} setValues={setValues} />
          <CreateProductForm
            valuesChangeHandler={valuesChangeHandler}
            productFormSubmitHandler={productFormSubmitHandler}
            values={values}
            colors={colors}
            brands={brands}
            categories={categories}
            allSubs={allSubs}
            onSetValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
