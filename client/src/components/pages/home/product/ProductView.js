import { Card, Tabs } from "antd";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  HeartOutlined,
  StarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import ProductInfoList from "./ProductInfoList";

const defaultImage = require("../../../../assets/default-product.png");

const ProductView = ({ product }) => {
  return (
    <>
      <div className="row text-center">
        <div className="col-md-7">
          {/* product images carousel */}
          <Carousel className="text-center" autoPlay infiniteLoop>
            {product && product.images.length > 0 ? (
              product.images.map((image) => {
                return (
                  <div key={image.public_id}>
                    <img src={image.url} alt={image.url} />
                  </div>
                );
              })
            ) : (
              <div>
                <img src={defaultImage} alt="Not available" />
              </div>
            )}
          </Carousel>
          <Tabs
            defaultActiveKey="1"
            type="card"
            items={[
              {
                label: "Description",
                key: "description",
                children: product.description,
              },
              {
                label: "More",
                key: "more",
                children: " For more information contact us on xxxx xxx xxx",
              },
            ]}
          ></Tabs>
        </div>
        <div className="col-md-5">
          <h3 className="bg-primary text-light text-center p-4">
            {product.title}
          </h3>
          <Card
            className=" mb-3 d-inline-block"
            style={{ width: "100%" }}
            cover={<ProductInfoList product={product} />} //product info list rendering
            actions={[
              <Link to={`/product/${product.slug}`}>
                {" "}
                <HeartOutlined className="text-info mb-2" />
                <p>Add to Wishlist</p>
              </Link>,
              <div>
                {" "}
                <ShoppingCartOutlined
                  className="text-success mb-2"
                  onClick={() => {}}
                />
                <p>Add to Cart</p>
              </div>,
              <Link to={`/product/rating/${product._id}`}>
                <div>
                  {" "}
                  <StarOutlined
                    className="text-success mb-2"
                    onClick={() => {}}
                  />
                  <p>Login to leave Rating</p>
                </div>
              </Link>,
            ]}
          ></Card>
        </div>
      </div>
    </>
  );
};

export default ProductView;
