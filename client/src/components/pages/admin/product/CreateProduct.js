import { useEffect } from "react";

import AdminNavbar from "../../../nav/AdminNavbar";
import CreateProductForm from "../../../forms/CreateProductForm";
import ImagesUploadForm from "../../../forms/ImagesUploadForm";

//custom hook
import useProductFormStates from "../../../../customHooks/useProductFormStates";

import { createProduct } from "../../../../functions/productFunctions";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const user = useSelector((state) => state.user);

  const { values, setValues, categories, allSubs, valuesChangeHandler } =
    useProductFormStates();

  //getting subs for a category
  const { category } = values;
  useEffect(() => {
    setValues((prevState) => ({ ...prevState, subs: [] }));
  }, [category, setValues]);

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
