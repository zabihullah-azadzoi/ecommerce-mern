import { useState, useEffect, memo } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../../../../functions/productFunctions";
import HomeProductCard from "../../../cards/HomeProductCard";

const RelatedProducts = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //filtering all products and excluding current product
  useEffect(() => {
    setIsLoading(true);
    getAllProducts(10, 1, "createdAt")
      .then((res) => {
        const filteredProducts = res.data.filter(
          (pro) =>
            pro.slug !== product.slug &&
            pro.category.name === product.category.name
        );
        setProducts(filteredProducts);
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.response && e.response.data.error);
        setIsLoading(false);
      });
  }, [product]);

  return (
    <>
      {isLoading ? (
        <h4 className="text-center">Loading...</h4>
      ) : products.length > 0 ? (
        products.map((product) => {
          return (
            <div className="col-md-4 text-center" key={product._id}>
              <HomeProductCard product={product} />
            </div>
          );
        })
      ) : (
        <h4 className="text-center">
          No related products available at the moment.
        </h4>
      )}
    </>
  );
};

export default memo(RelatedProducts);
