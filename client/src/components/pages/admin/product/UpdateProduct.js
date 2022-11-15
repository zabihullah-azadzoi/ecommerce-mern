import { useEffect } from "react";

import AdminNavbar from "../../../nav/AdminNavbar";
import CreateProductForm from "../../../forms/CreateProductForm";
import ImagesUploadForm from "../../../forms/ImagesUploadForm";
import {
  getProduct,
  updateProduct,
} from "../../../../functions/productFunctions";

//custom hook
import useProductFormStates from "../../../../customHooks/useProductFormStates";

import { useParams, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const user = useSelector((state) => state.user);
  const { slug } = useParams();
  const history = useHistory();

  const { values, setValues, categories, allSubs, valuesChangeHandler } =
    useProductFormStates();

  //fetching a product using it's slug
  useEffect(() => {
    getProduct(slug)
      .then((res) => {
        setValues({
          ...res.data,
          category: res.data.category ? res.data.category._id : "",
          subs:
            res.data.subs.length > 0 ? res.data.subs.map((sub) => sub._id) : [],
        });
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  }, [slug, setValues]);

  const productFormUpdateHandler = (e) => {
    e.preventDefault();

    updateProduct(user.token, values, slug)
      .then((res) => {
        toast.success(`${res.data.title} updated successfully!`);
        setTimeout(() => {
          history.push("/admin/products");
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
          <h3>Update Product</h3>
          <ImagesUploadForm values={values} setValues={setValues} />
          <CreateProductForm
            productFormSubmitHandler={productFormUpdateHandler}
            values={values}
            valuesChangeHandler={valuesChangeHandler}
            onSetValues={setValues}
            categories={categories}
            allSubs={allSubs}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
