const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

//Insert Product on the database
router.post("/create", cartController.addCart);
// // Update Product by id
router.patch("/add/product/:id", cartController.addProductOnCartById);

router.patch("/remove/product/:id", cartController.removeProductFromCartById);

router.patch(
  "/increment/product/:id",
  cartController.incrementProductFromCartById
);
router.patch(
  "/decrement/product/:id",
  cartController.decrementProductFromCartById
);

// //Find all
router.get("/all", cartController.getAllCarts);

// //Find unique by id
router.get("/:id", cartController.getCartById);

module.exports = router;
