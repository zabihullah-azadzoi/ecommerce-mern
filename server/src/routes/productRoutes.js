const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");
const {
  createProduct,
  getAllProducts,
  getProductSubs,
} = require("../controllers/productControllers");

router.post("/api/product", authCheck, adminCheck, createProduct);
router.get("/api/products", getAllProducts);

//getting all sub products based on a product id
router.get("/api/product/subs/:id", getProductSubs);

module.exports = router;
