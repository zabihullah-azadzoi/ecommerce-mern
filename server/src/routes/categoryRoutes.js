const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authCheck");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.get("/api/categories", getAllCategories);
router.get("/api/category/:slug", getCategory);
router.post("/api/category", authCheck, adminCheck, createCategory);
router.put("/api/category/:slug", authCheck, adminCheck, updateCategory);
router.delete("/api/category/:slug", authCheck, adminCheck, deleteCategory);

module.exports = router;
