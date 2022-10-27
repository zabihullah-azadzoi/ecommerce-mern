import { useState, useEffect } from "react";

import AdminNavbar from "../../nav/AdminNavbar";
import { toast } from "react-toastify";

import { getAllProducts } from "../../../functions/productFunctions";

import { Card } from "antd";
const { Meta } = Card;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllProducts(5)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h3 className="mb-5">All Products</h3>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <Card
                  hoverable
                  className="me-3 mb-3 d-inline-block"
                  style={{ width: 320 }}
                  key={product._id}
                  cover={
                    <img
                      alt={product.title}
                      src={product.images[0].url}
                      style={{ height: 180 }}
                    />
                  }
                >
                  <Meta
                    title={product.title}
                    description={product.description}
                  />
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
