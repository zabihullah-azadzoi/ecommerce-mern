import { useState, useEffect } from "react";
import { getProduct } from "../../../../functions/productFunctions";
import ProductView from "./ProductView";
import { toast } from "react-toastify";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(e.response ? e.response.data.error : e);
      });
  }, [slug]);

  return (
    <div className="container-fluid mt-2">
      <ProductView product={product} />

      <div className="row mt-5 mb-5">
        <div className="col-md-10 offset-md-1 text-center  pt-5 pb-5 ">
          <hr />
          <h3>Related Products</h3>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
