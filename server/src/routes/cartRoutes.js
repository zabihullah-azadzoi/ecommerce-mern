const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/authCheck");

const {
  createCart,
  getCart,
  deleteCart,
  applyCoupon,
} = require("../controllers/cartControllers");

router.post("/api/user/cart", authCheck, createCart);
router.get("/api/user/cart", authCheck, getCart);
router.delete("/api/user/cart", authCheck, deleteCart);

router.post("/api/user/cart/coupon", authCheck, applyCoupon);

module.exports = router;
