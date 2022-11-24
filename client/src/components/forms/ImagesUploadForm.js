import { useState } from "react";
import Resizer from "react-image-file-resizer";

import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  imageUpload,
  imageRemove,
} from "../../functions/imagesUploadFunctions";
import { toast } from "react-toastify";

const ImagesUploadForm = ({ values, setValues, label = "Upload Images" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const imagesUploadHandler = (e) => {
    const files = e.target.files;
    const allImages = [...values.images];

    if (files[0]) {
      for (let i = 0; i < files.length; i++) {
        setIsLoading(true);
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            imageUpload(user.token, uri)
              .then((res) => {
                allImages.push(res.data);
                setValues((prevState) => ({ ...prevState, images: allImages }));
                setIsLoading(false);
              })
              .catch((e) => {
                setIsLoading(false);
                toast.error(e.response.data.error);
              });
          },
          "base64"
        );
      }
    }
  };

  const removeImageAvatarHandler = (id) => {
    setIsLoading(true);
    imageRemove(user.token, id)
      .then((res) => {
        setValues((prevState) => ({
          ...prevState,
          images: values.images.filter((img) => img.public_id !== id),
        }));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(e.response.data.error);
      });
  };

  return (
    <div className="mb-3">
      {values.images.length > 0 &&
        values.images.map((image) => {
          return (
            <span
              className="avatar-item"
              style={{ marginRight: "20px" }}
              key={image.public_id}
            >
              <Badge
                count="X"
                style={{ transform: "none", cursor: "pointer" }}
                onClick={() => removeImageAvatarHandler(image.public_id)}
              >
                <Avatar
                  src={image.url}
                  size={80}
                  shape="round"
                  className=" mb-3"
                />
              </Badge>
            </span>
          );
        })}
      <label className="form-label d-block" htmlFor="images">
        {label}
      </label>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <input
          name="images"
          type="file"
          multiple
          disabled={values.images.length === 4}
          accept="image/*"
          className="form-control"
          onChange={imagesUploadHandler}
        />
      )}
    </div>
  );
};

export default ImagesUploadForm;
