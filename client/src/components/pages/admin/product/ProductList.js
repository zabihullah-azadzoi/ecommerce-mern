import { useState, useEffect } from "react";

import AdminNavbar from "../../../nav/AdminNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  getAllProducts,
  deleteProduct,
} from "../../../../functions/productFunctions";

import AdminProductCard from "../../../cards/AdminProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const renderAllProducts = () => {
    getAllProducts(20, 1, "createdAt")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  useEffect(() => {
    renderAllProducts();
  }, []);

  const deleteProductHandler = (slug) => {
    deleteProduct(user.token, slug)
      .then((res) => {
        toast.success(`${res.data.title} has been deleted successfully!`);
        renderAllProducts();
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
          <h3 className="mb-5">All Products</h3>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <AdminProductCard
                  product={product}
                  key={product._id}
                  deleteProductHandler={deleteProductHandler}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
