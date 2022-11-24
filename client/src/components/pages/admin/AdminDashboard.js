import { useState, useEffect } from "react";

import CountUp from "react-countup";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { MostSoldProductsChart } from "../../charts/MostSoldProductsChart";
import { MonthlySalesChart } from "../../charts/MonthlySalesChart";

import {
  getOrdersSalesReport,
  getAllOrders,
} from "../../../functions/orderFunctions";
import {
  getProductsCount,
  getAllProducts,
} from "../../../functions/productFunctions";

// import AdminNavbar from "../../nav/AdminNavbar2";
import {
  InboxOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import { Card } from "antd";
import AdminNavbar from "../../nav/AdminNavbar";
const { Meta } = Card;

const AdminDashboard = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [productData, setProductData] = useState([]);
  const [productLabels, setProductLabels] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user === "null") return;
    getAllOrders(user.token)
      .then((res) => {
        setOrdersCount(res.data.length);
        const totalAmount = res.data.reduce((a, b) => {
          return a + b.paymentIntent.amount / 100;
        }, 0);

        setTotalSales(totalAmount);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
    getProductsCount(user.token)
      .then((res) => setProductsCount(res.data))
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );

    // get most sold products
    getAllProducts(6, 1, "sold")
      .then((res) => {
        if (res.data.length > 0) {
          let productData = [];
          let productLabels = [];
          res.data.forEach((product) => {
            productData.push(product.sold);
            productLabels.push(product.title);
          });
          setProductData(productData);
          setProductLabels(productLabels);
        }
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );

    //get orders sales report
    getOrdersSalesReport(user.token)
      .then((res) => {
        let monthlySales = [];
        monthlySales.length = 12;
        monthlySales.fill(0);

        if (res.data.length > 0) {
          res.data.forEach((item) => {
            monthlySales.splice(item._id.month - 1, 1, item.totalAmount);
          });
        }
        setMonthlySalesData(monthlySales);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, [user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 p-0">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4 className="mt-3 mb-5 ">Dashboard</h4>
          <div className="row d-flex">
            <div className="col-md-4 mt-2">
              <Card className="card">
                <Meta
                  avatar={
                    <DollarCircleOutlined
                      style={{ fontSize: "2rem", color: "royalblue" }}
                    />
                  }
                  className="display-6"
                  title="Total Sales"
                  description=<div>
                    ${<CountUp start={0} end={totalSales} />}
                  </div>
                />
              </Card>
            </div>
            <div className="col-md-4 mt-2">
              <Card className="card">
                <Meta
                  avatar={
                    <ShoppingCartOutlined
                      style={{ fontSize: "2rem", color: "green" }}
                    />
                  }
                  className="display-6"
                  title="Total Orders"
                  description={<CountUp start={0} end={ordersCount} />}
                />
              </Card>
            </div>
            <div className="col-md-4 mt-2">
              <Card className="card">
                <Meta
                  avatar={
                    <InboxOutlined
                      style={{ fontSize: "2rem", color: "darkorange" }}
                    />
                  }
                  className="display-6"
                  title="Total Products"
                  description={<CountUp start={0} end={productsCount} />}
                />
              </Card>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <Card className="card">
                {" "}
                <MonthlySalesChart monthlySalesData={monthlySalesData} />
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="card">
                {" "}
                <MostSoldProductsChart
                  productData={productData}
                  productLabels={productLabels}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
