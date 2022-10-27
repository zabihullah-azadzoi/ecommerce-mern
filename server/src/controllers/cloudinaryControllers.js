const { json } = require("body-parser");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(req.body.image, {
      resource_type: "image",
    });
    res.json({
      public_id: response.public_id,
      url: response.url,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.removeImage = async (req, res) => {
  try {
    const response = await cloudinary.uploader.destroy(req.params.id);
    res.json({
      result: response.result,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};
