import { Card } from "antd";
import { Link } from "react-router-dom";

import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;

const defaultImage = require("../../assets/default-product.png");

const HomeProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      className=" mb-3 d-inline-block"
      style={{ width: 360 }}
      cover={
        <img
          alt={product.title}
          src={product.images.length > 0 ? product.images[0].url : defaultImage}
          style={{ height: 180 }}
        />
      }
      actions={[
        <Link to={`/product/${product.slug}`}>
          {" "}
          <EyeOutlined className="text-info mb-2" />
          <p>View Product</p>
        </Link>,
        <div>
          {" "}
          <ShoppingCartOutlined
            className="text-success mb-2"
            onClick={() => {}}
          />
          <p>Add to Cart</p>
        </div>,
      ]}
    >
      <Meta
        title={product.title}
        className="text-start"
        description={product.description.substring(0, 25) + " ..."}
      />
    </Card>
  );
};

export default HomeProductCard;
