import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

import { getAllProducts } from "../../../functions/productFunctions";
import HomeProductCard from "../../cards/HomeProductCard";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getAllProducts(20, 1, "createdAt")
      .then((res) => {
        setProducts(
          res.data.filter((product) => product.category.slug === slug)
        );
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.response && e.response.data.error);
        setIsLoading(false);
      });
  }, [slug]);

  return (
    <div>
      <div
        className="p-4 text-center  mb-5 text-secondary "
        style={{ backgroundColor: "#3E3D53" }}
      >
        <p className="display-6">
          {isLoading
            ? "Loading..."
            : `Total ${products.length} products in ${
                products.length > 0 ? products[0].category.name : "this"
              } category`}{" "}
        </p>
      </div>
      {!isLoading && (
        <div className="container">
          {products.length > 0 ? (
            <div className="row">
              {products.map((product) => {
                return (
                  <div className="col-md-4 text-center" key={product._id}>
                    <HomeProductCard product={product} />
                  </div>
                );
              })}
            </div>
          ) : (
            <h4 className="text-center">
              No Products available in this category
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
