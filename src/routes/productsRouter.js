const { Router } = require("express");
const {
  getProductById,
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
} = require("../controllers/products.controller");

const router = Router();

router.get("/", getProducts);
router.get("/search", getProductByName);
router.get("/:id", getProductById);

router.post("/", createProduct);
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct); // borrado lógico
router.patch("/restore/:id", restoreProduct);

module.exports = router;
