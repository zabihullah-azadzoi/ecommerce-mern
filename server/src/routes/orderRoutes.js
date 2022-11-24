const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");

const {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
  getOrdersCount,
  getOrdersSalesReport,
} = require("../controllers/orderControllers");

router.post("/api/order", authCheck, createOrder);
router.get("/api/order", authCheck, getOrders);
router.get("/api/orders", authCheck, adminCheck, getAllOrders);
router.get(
  "/api/orders/sales-report",
  authCheck,
  adminCheck,
  getOrdersSalesReport
);
router.patch("/api/orders/:id", authCheck, adminCheck, updateOrderStatus);

module.exports = router;
