const express = require("express");
const {
  createOrUpdateUser,
  currentUser,
} = require("../controllers/userControllers");

const router = express.Router();

const { authCheck } = require("../middlewares/authCheck");

router.post("/api/create-update-user", authCheck, createOrUpdateUser);
router.post("/api/current-user", authCheck, currentUser);

module.exports = router;
