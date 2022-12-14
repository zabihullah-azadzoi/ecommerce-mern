import { useState, useEffect, memo } from "react";
import {
  getAllProducts,
  getProductsCount,
} from "../../functions/productFunctions";
import { toast } from "react-toastify";
import CardSkeleton from "../cards/CardSkeleton";

import { Pagination } from "antd";

import HomeProductCard from "../cards/HomeProductCard";

const ProductPagination = ({ limit, sortBy }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAllProducts(limit, page, sortBy)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(e.response ? e.response.data.error : e);
      });
  }, [page, limit, sortBy]);

  useEffect(() => {
    getProductsCount()
      .then((res) => setProductsCount(res.data))
      .catch((e) => {
        toast.error(e.response ? e.response.data.error : e);
      });
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <CardSkeleton count={limit} />
      ) : (
        products.length > 0 && (
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-md-4 text-center" key={product._id}>
                  <HomeProductCard product={product} />
                </div>
              );
            })}
          </div>
        )
      )}
      <Pagination
        className="text-center mt-5 mb-5"
        defaultCurrent={1}
        total={
          productsCount !== 0 ? Math.floor((productsCount / limit) * 10) : 10
        }
        onChange={(value) => setPage(value)}
      />
    </div>
  );
};

export default memo(ProductPagination);
