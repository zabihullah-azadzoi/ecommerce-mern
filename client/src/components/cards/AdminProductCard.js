import { Card, Modal } from "antd";
import { Link } from "react-router-dom";

import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

//default image if none exist for a product
const defaultImage = require("../../assets/default-product.png");

const AdminProductCard = ({ product, deleteProductHandler }) => {
  //delete modal
  const showConfirm = (slug, name) => {
    Modal.confirm({
      title: `Do you Want to delete ${name} category?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteProductHandler(slug);
      },
    });
  };

  return (
    <Card
      hoverable
      className="me-3 mb-3 d-inline-block"
      style={{ width: 320 }}
      cover={
        <img
          alt={product.title}
          src={product.images.length > 0 ? product.images[0].url : defaultImage}
          style={{ height: 180 }}
        />
      }
      actions={[
        <Link to={`/admin/product/${product.slug}`}>
          {" "}
          <EditOutlined key="edit" />
        </Link>,
        <DeleteOutlined
          key="delete"
          onClick={() => showConfirm(product.slug, product.title)}
        />,
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

export default AdminProductCard;
