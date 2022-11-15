import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

import { getAllProducts } from "../../../functions/productFunctions";
import HomeProductCard from "../../cards/HomeProductCard";

const Sub = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getAllProducts(20, 1, "createdAt")
      .then((res) => {
        let newArray = [];
        res.data.forEach((product) => {
          let newElement = product.subs.find((sub) => sub.slug === slug);
          if (newElement) newArray.push(product);
        });
        setProducts(newArray);

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
                products.length > 0
                  ? products[0].subs.find((sub) => sub.slug === slug).name // finding name of the sub from list of products based on sub's slug
                  : "this"
              } sub category`}{" "}
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
              No Products available in this sub category
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default Sub;
