const { Router } = require("express");
const {
  getCategories,
  createCategory,
} = require("../controllers/categories.controller");

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);

module.exports = router;
