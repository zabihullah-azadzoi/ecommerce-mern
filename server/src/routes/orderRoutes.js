const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");

const {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderControllers");

router.post("/api/order", authCheck, createOrder);
router.get("/api/order", authCheck, getOrders);
router.get("/api/orders", authCheck, adminCheck, getAllOrders);
router.patch("/api/orders/:id", authCheck, adminCheck, updateOrderStatus);

// router.post("/api/order/cash-on-delivery", authCheck, createCashOnDeliveryOrder)

module.exports = router;
