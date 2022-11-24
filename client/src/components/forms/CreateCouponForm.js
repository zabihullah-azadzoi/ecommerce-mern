import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

const CreateCouponForm = ({
  createCouponHandler,
  name,
  setName,
  discount,
  setDiscount,
  expireDate,
  setExpireDate,
}) => {
  return (
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
          minDate={new Date()}
          onChange={(date) => setExpireDate(date)}
        />
      </div>
      <button className="btn btn-info">Save</button>
    </form>
  );
};

export default CreateCouponForm;
