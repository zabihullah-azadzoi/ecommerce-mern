const express = require("express");
const {
  createOrUpdateUser,
  currentUser,
} = require("../controllers/userControllers");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");

router.post("/api/create-update-user", authCheck, createOrUpdateUser);
router.post("/api/current-user", authCheck, currentUser);
router.post("/api/admin", authCheck, adminCheck, currentUser);

module.exports = router;
