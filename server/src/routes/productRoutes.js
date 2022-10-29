const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductSubs,
  updateProduct,
} = require("../controllers/productControllers");

router.post("/api/product", authCheck, adminCheck, createProduct);
router.get("/api/products/:limit", getAllProducts);
router.get("/api/product/:slug", getProduct);
router.delete("/api/product/:slug", authCheck, adminCheck, deleteProduct);
router.put("/api/product/:slug", authCheck, adminCheck, updateProduct);

// router.get("/api/products", getAllProducts);

//getting all sub products based on a product id
router.get("/api/product/subs/:id", getProductSubs);

module.exports = router;
