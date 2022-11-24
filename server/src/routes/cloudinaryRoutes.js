const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");

const {
  uploadImages,
  removeImage,
} = require("../controllers/cloudinaryControllers");

// router.post("/api/product/image", authCheck, adminCheck, uploadImages);
// router.delete("/api/product/image/:id", authCheck, adminCheck, removeImage);

router.post("/api/cloudinary/image", authCheck, uploadImages);
router.delete("/api/cloudinary/image/:id", authCheck, removeImage);

module.exports = router;
