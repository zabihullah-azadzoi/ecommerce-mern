import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../../functions/categoryFunctions";
import { Link } from "react-router-dom";

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
              <div className="col text-center" key={cat._id}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="btn btn-outline-dark btn-rounded btn-raised m-2 btn-lg "
                >
                  {cat.name}
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
