import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../../functions/categoryFunctions";
import { Link } from "react-router-dom";

import defaultImage from "../../../../assets/default-product.png";

const AllCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.response && e.response.data.error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mb-5">
      {isLoading ? (
        <h5 className="text-center">Loading...</h5>
      ) : categories.length > 0 ? (
        <div className="row">
          {categories.map((cat) => {
            return (
              <div className="col-md-3 col-sm-6 mb-4" key={cat.slug}>
                <Link to={`/category/${cat.slug}`}>
                  <div
                    className="bg-image hover-zoom ripple shadow-1-strong rounded"
                    style={{ height: "25rem" }}
                  >
                    <img
                      src={cat.coverPhoto ? cat.coverPhoto.url : defaultImage}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                    <span>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                      >
                        <div className="d-flex justify-content-start align-items-start h-100">
                          <h5>
                            <span className="badge bg-dark pt-2 ms-3 mt-3 text-light">
                              {cat.name}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="hover-overlay">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(253, 253, 253, 0.15)",
                          }}
                        ></div>
                      </div>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <h5 className="text-center">No categories available</h5>
      )}
    </div>
  );
};

export default AllCategoriesList;
