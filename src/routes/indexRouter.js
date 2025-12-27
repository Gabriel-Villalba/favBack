const { Router } = require("express");

const users = require("./usersRouter");
const products = require("./productsRouter");
const categories = require("./categoriesRouter");
const auth = require("./authrouter");
const cart = require("./cartRouter");
const orders = require("./ordersRouter");
const mp = require("./mpRouterRouter");

const router = Router();

router.get("/", (req, res) => {
  res.send("Favstore API funcionando 🚀");
});

// Auth
router.use("/auth", auth);

// Core
router.use("/users", users);
router.use("/products", products);
router.use("/categories", categories);

// Ecommerce
router.use("/cart", cart);
router.use("/orders", orders);

// Pagos
router.use("/mp", mp);

module.exports = router;
