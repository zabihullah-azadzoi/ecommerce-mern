const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/authCheck");
const {
  UpdateSettings,
  getSettings,
} = require("../controllers/settingsControllers");

const router = express.Router();

router.get("/api/settings", getSettings);
router.put("/api/settings", authCheck, adminCheck, UpdateSettings);

module.exports = router;
