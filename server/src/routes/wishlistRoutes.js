const express = require("express");
const { auth } = require("firebase-admin");

const router = express.Router();

const { authCheck } = require("../middlewares/authCheck");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistControllers");

router.post("/api/user/wishlist", authCheck, addToWishlist);
router.get("/api/user/wishlist", authCheck, getWishlist);
router.patch("/api/user/wishlist/:id", authCheck, removeFromWishlist);

module.exports = router;
