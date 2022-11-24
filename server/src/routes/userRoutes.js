const express = require("express");
const {
  createOrUpdateUser,
  currentUser,
  updateAddress,
  getAllUsers,
} = require("../controllers/userControllers");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");

router.post("/api/create-update-user", authCheck, createOrUpdateUser);
router.post("/api/current-user", authCheck, currentUser);
router.post("/api/admin", authCheck, adminCheck, currentUser);

router.patch("/api/user/address", authCheck, updateAddress);

router.get("/api/users", authCheck, adminCheck, getAllUsers);

module.exports = router;
