import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";

import Invoice from "../invoice/Invoice";

const cardBorderColorHandler = (orderStatus) => {
  switch (orderStatus) {
    case "Not Processed":
      return "yellow";
    case "Processed":
      return "orange";
    case "Dispatched":
      return "blue";
    case "Cancelled":
      return "red";
    case "Completed":
      return "green";
    default:
      return "white";
  }
};

const OrderCard = ({ order, admin = false, updateOrderStatusHandler }) => {
  const orderStatusSelectorHandler = (order) => {
    return (
      <div>
        <div className="row  p-2">
          <div className="col-6">
            <label htmlFor="status">Change order status:</label>
          </div>
          <div className="col-6">
            {" "}
            <select
              name="status"
              className="form-control d-inline-block"
              defaultValue={order.orderStatus}
              onChange={(e) =>
                updateOrderStatusHandler(order._id, e.target.value)
              }
            >
              <option value="Not Processed">Not Processed</option>
              <option value="Processed">Processed</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="card mt-2 mb-5"
      style={{
        backgroundColor: "ghostwhite",
        border: `4px solid ${cardBorderColorHandler(order.orderStatus)}`,
      }}
    >
      <div className="card-body ">
        <div className="row">
          <div className="col-md-4">
            <strong>Order id:</strong> {order._id}
          </div>
          <div className="col-md-4">
            <strong>Amount:</strong> ${order.paymentIntent.amount / 100}
          </div>
          <div className="col-md-4">
            <strong>Currency:</strong>{" "}
            {order.paymentIntent.currency.toUpperCase()}
          </div>
          <div className="col-md-4">
            <strong>Payment mode:</strong>{" "}
            {order.paymentIntent.payment_method_types[0]}
          </div>
          <div className="col-md-4">
            <strong>ordered on:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div className="badge bg-info col-md-4 p-2">
            <strong>STATUS:</strong> {order.orderStatus}
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table mt-3 mb-3">
              <thead className="bg-info text-light">
                <tr className="text-center">
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Color</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Shipping</th>
                </tr>
              </thead>
              <tbody>
                {order.products.length > 0 &&
                  order.products.map((product) => {
                    return (
                      <tr key={product._id} className="text-center">
                        <td>{product.product.title}</td>
                        <td>${product.product.price}</td>
                        <td>{product.product.brand}</td>
                        <td>{product.color}</td>
                        <td>{product.count}</td>
                        <td>
                          {product.product.shipping === "yes" ? (
                            <CheckCircleOutlined className="text-success" />
                          ) : (
                            <CloseCircleOutlined className="text-danger" />
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {admin ? (
          orderStatusSelectorHandler(order)
        ) : (
          <PDFDownloadLink
            fileName="invoice.pdf"
            className="btn d-block btn-outline-info"
            document={<Invoice order={order} />}
          >
            {" "}
            Download Invoice{" "}
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
