import { Link } from "react-router-dom";

const ProductInfoList = ({ product }) => {
  return (
    <ul className="list-group list-group-light p-4">
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Price
        <span className=" rounded-pill">{product.price}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Category
        <span className=" rounded-pill">
          {product.category && (
            <Link to={`/category/${product.category.slug}`}>
              {product.category && product.category.name}
            </Link>
          )}
        </span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Sub Categories
        <span className=" rounded-pill">
          {product.subs &&
            product.subs.map((sub) => {
              return (
                <Link to={`/sub/${sub.slug}`} key={sub._id}>
                  <span className="ms-4">{sub.name}</span>
                </Link>
              );
            })}
        </span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Shipping
        <span className=" rounded-pill">{product.shipping}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Color
        <span className=" rounded-pill">{product.color}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Brand
        <span className=" rounded-pill">{product.brand}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Available
        <span className=" rounded-pill">{product.quantity}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
        Sold
        <span className=" rounded-pill">{product.sold}</span>
      </li>
    </ul>
  );
};

export default ProductInfoList;
