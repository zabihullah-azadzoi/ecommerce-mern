import ModalImage from "react-modal-image";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const defaultImage = require("../../../assets/default-product.png");

const colors = ["Black", "White", "Red", "Silver", "Blue"];

const CartTable = ({
  cart,
  colorChangeHandler,
  removeItemFromCartHandler,
  countIncrementHandler,
}) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle mt-3 mb-0 bg-white">
        <thead className="bg-info">
          <tr className="text-center">
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 &&
            cart.map((product) => {
              return (
                <tr key={product._id} className="text-center">
                  <td>
                    <div
                      style={{
                        width: "12rem",
                        height: "auto",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <ModalImage
                        small={
                          product.images.length > 0
                            ? product.images[0].url
                            : defaultImage
                        }
                        large={
                          product.images.length > 0
                            ? product.images[0].url
                            : defaultImage
                        }
                      />
                    </div>
                  </td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.brand}</td>
                  <td className="p-1">
                    <select
                      className="form-select "
                      onClick={(e) => colorChangeHandler(e, product, "color")}
                    >
                      <option value={product.color ? product.color : ""}>
                        {product.color ? product.color : "Please select"}
                      </option>
                      {colors
                        .filter((c) => c !== product.color)
                        .map((c) => {
                          return (
                            <option value={c} key={c}>
                              {c}
                            </option>
                          );
                        })}
                    </select>
                  </td>
                  <td style={{ maxWidth: "7rem" }}>
                    <input
                      style={{ maxWidth: "7rem" }}
                      type="number"
                      defaultValue={product.count}
                      className="form-control"
                      onChange={(e) =>
                        countIncrementHandler(e, product, "count")
                      }
                    />
                  </td>
                  <td>
                    {product.shipping === "Yes" ? (
                      <CheckCircleOutlined className="text-success" />
                    ) : (
                      <CloseCircleOutlined className="text-danger" />
                    )}
                  </td>
                  <td>
                    {" "}
                    <DeleteOutlined
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={(e) =>
                        removeItemFromCartHandler(e, product, "remove")
                      }
                    />{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
