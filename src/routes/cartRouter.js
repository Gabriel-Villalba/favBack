const { Router } = require("express");
const {
  getCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} = require("../controllers/cart.controller");

const router = Router();

router.get("/", getCart);
router.post("/add", addProductToCart);
router.delete("/remove/:productId", removeProductFromCart);
router.delete("/clear", clearCart);

module.exports = router;
