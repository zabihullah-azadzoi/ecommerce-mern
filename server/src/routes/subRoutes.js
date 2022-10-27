const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");
const {
  getSub,
  getAllSubs,
  deleteSub,
  updateSub,
  createSub,
} = require("../controllers/subControllers");

router.get("/api/subs", getAllSubs);
router.post("/api/sub", authCheck, adminCheck, createSub);
router.get("/api/sub/:slug", getSub);
router.put("/api/sub/:slug", authCheck, adminCheck, updateSub);
router.delete("/api/sub/:slug", authCheck, adminCheck, deleteSub);

module.exports = router;
