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
  getProductsCount,
  ratingProduct,
  filterProducts,
} = require("../controllers/productControllers");

router.post("/api/product", authCheck, adminCheck, createProduct);
router.get("/api/products", getAllProducts);
router.get("/api/products/count", getProductsCount);
router.get("/api/product/:slug", getProduct);
router.delete("/api/product/:slug", authCheck, adminCheck, deleteProduct);
router.put("/api/product/:slug", authCheck, adminCheck, updateProduct);
router.put("/api/product/rating/:id", authCheck, ratingProduct);

//filtering products
router.post("/api/products/search", filterProducts);

//getting all sub products based on a product id
router.get("/api/product/subs/:id", getProductSubs);

module.exports = router;
