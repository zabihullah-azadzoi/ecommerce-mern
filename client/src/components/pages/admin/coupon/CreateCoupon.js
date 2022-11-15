import { useState, useEffect, useCallback } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from "../../../../functions/couponFunctions";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expireDate, setExpireDate] = useState(new Date());
  const [allCoupons, setAllCoupons] = useState([]);

  const user = useSelector((state) => state.user);

  const renderAllCoupons = useCallback(() => {
    getAllCoupons(user.token)
      .then((res) => {
        setAllCoupons(res.data);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, [user]);

  //get all coupons
  useEffect(() => {
    renderAllCoupons();
  }, [renderAllCoupons]);

  const createCouponHandler = (e) => {
    e.preventDefault();
    createCoupon(user.token, { name, discount, expireDate })
      .then((res) => {
        toast.success(`${res.data.name} added`);
        renderAllCoupons();
        setName("");
        setDiscount(0);
        setExpireDate(new Date());
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  };

  const deleteCouponHandler = (couponId) => {
    deleteCoupon(user.token, couponId)
      .then((res) => {
        if (res.statusText === "OK") {
          toast.info(`${res.data.name} deleted successfully!`);
          renderAllCoupons();
        }
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  };

  //delete coupon modal
  const showConfirm = (couponId, name) => {
    Modal.confirm({
      title: `Do you Want to delete ${name} coupon?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteCouponHandler(couponId);
      },
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h3 className="mt-2 mb-3"> Create a new Coupon</h3>
          <form onSubmit={createCouponHandler}>
            <div className="mb-5 w-50">
              <label htmlFor="name">Coupon Name</label>
              <br />
              <input
                required
                className="form-control"
                name="name"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5 w-50">
              <label htmlFor="Discount">Discount (%) </label>
              <br />
              <input
                required
                className="form-control"
                name="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="mb-5 w-50">
              <label htmlFor="expireDate">Expiry Date</label>
              <br />
              <DatePicker
                required
                value={expireDate}
                onChange={(date) => setExpireDate(date)}
              />
            </div>
            <button className="btn btn-info">Save</button>
          </form>
          <br />
          <hr />
          <p>All available coupons</p>
          {allCoupons.length > 0 ? (
            <table className="table">
              <thead className="bg-info text-light">
                <tr className="text-center">
                  <th scope="col">Coupon</th>
                  <th scope="col">Discount</th>
                  <th scope="col">ExpiryDate</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allCoupons.map((coupon) => {
                  return (
                    <tr key={coupon._id} className="text-center">
                      <td>{coupon.name}</td>
                      <td>%{coupon.discount}</td>
                      <td>
                        {new Date(coupon.expireDate).toLocaleDateString()}
                      </td>
                      <td>
                        <DeleteOutlined
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => showConfirm(coupon._id, coupon.name)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No coupon available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
