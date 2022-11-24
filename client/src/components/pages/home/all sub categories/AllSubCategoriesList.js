import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllSubs } from "../../../../functions/subFunctions";

import { Link } from "react-router-dom";

const AllSubCategoriesList = () => {
  const [subs, setSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllSubs()
      .then((res) => {
        setSubs(res.data);
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
      ) : subs.length > 0 ? (
        <div className="row w-100">
          {subs.map((sub) => {
            return (
              <div className="col text-center" key={sub._id}>
                <Link
                  to={`/sub/${sub.slug}`}
                  className="btn btn-outline-dark btn-rounded btn-raised m-2 btn-lg w-100"
                >
                  {sub.name}
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <h5 className="text-center">No sub categories available</h5>
      )}
    </div>
  );
};

export default AllSubCategoriesList;
