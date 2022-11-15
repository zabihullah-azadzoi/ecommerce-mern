const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");

const {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} = require("../controllers/couponControllers");

router.post("/api/coupon", authCheck, adminCheck, createCoupon);
router.get("/api/coupon", authCheck, adminCheck, getAllCoupons);
router.delete("/api/coupon/:id", authCheck, adminCheck, deleteCoupon);

module.exports = router;
