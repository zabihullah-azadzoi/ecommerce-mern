import { useState, useEffect, useCallback } from "react";

import AdminNavbar from "../../../nav/AdminNavbar";
import AdminProductCard from "../../../cards/AdminProductCard";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Pagination } from "antd";

import {
  getAllProducts,
  deleteProduct,
  getProductsCount,
} from "../../../../functions/productFunctions";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const renderAllProducts = useCallback(() => {
    getAllProducts(6, page, "createdAt")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  }, [page]);

  useEffect(() => {
    renderAllProducts();
  }, [renderAllProducts]);

  useEffect(() => {
    getProductsCount()
      .then((res) => setProductsCount(res.data))
      .catch((e) => {
        toast.error(e.response ? e.response.data.error : e);
      });
  }, []);

  const deleteProductHandler = (slug) => {
    deleteProduct(user.token, slug)
      .then((res) => {
        toast.success(`${res.data.title} deleted successfully!`);
        renderAllProducts();
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <AdminNavbar />
        </div>
        <div className="col-md-10 ">
          <h4 className="mt-3 mb-5 ">All Products</h4>
          <div className="row text-center">
            {" "}
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <div
                    className=" col-md-4 col-sm-6 text-center"
                    key={product._id}
                  >
                    {" "}
                    <AdminProductCard
                      product={product}
                      deleteProductHandler={deleteProductHandler}
                    />
                  </div>
                );
              })}
          </div>
          <Pagination
            className="text-center mt-5 mb-5"
            defaultCurrent={1}
            total={
              productsCount !== 0 ? Math.floor((productsCount / 6) * 10) : 10
            }
            onChange={(value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
