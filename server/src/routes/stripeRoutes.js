const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/authCheck");

const { createPaymentIntent } = require("../controllers/stripeControllers");

router.post("/api/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
