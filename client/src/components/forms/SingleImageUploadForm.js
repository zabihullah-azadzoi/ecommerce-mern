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

const SingleImageUploadForm = ({
  userData,
  setUserData,
  label = "Upload Image",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const image = userData.image || "";

  const user = useSelector((state) => state.user);
  const imagesUploadHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setIsLoading(true);
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          imageUpload(user.token, uri)
            .then((res) => {
              setUserData((prevState) => ({ ...prevState, image: res.data }));
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
  };

  const removeImageAvatarHandler = (id) => {
    setIsLoading(true);
    imageRemove(user.token, id)
      .then((res) => {
        setUserData((prevState) => ({ ...prevState, image: "" }));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(e.response.data.error);
      });
  };

  return (
    <div className="mb-3">
      <label className="form-label d-block" htmlFor="images">
        {label}
      </label>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <input
          name="image"
          type="file"
          disabled={image}
          accept="image/*"
          className="form-control"
          onChange={imagesUploadHandler}
        />
      )}
      {image && (
        <div className="mt-3">
          <span className="avatar-item " key={image.public_id}>
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
        </div>
      )}
    </div>
  );
};

export default SingleImageUploadForm;
