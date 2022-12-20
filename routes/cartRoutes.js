const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

//Insert cart on the database
router.post("/create", cartController.addCart);

//Delete cart on the database
router.delete("/delete/:id", cartController.removeCartById);

// add product from array products in the cart
router.patch("/add/product/:id", cartController.addProductOnCartById);

// Remove product from array products in the cart
router.patch("/remove/product/:id", cartController.removeProductFromCartById);

// Increment product from array products in the cart
router.patch(
  "/increment/product/:id",
  cartController.incrementProductFromCartById
);

// Decrement product from array products in the cart
router.patch(
  "/decrement/product/:id",
  cartController.decrementProductFromCartById
);

// //Find all
router.get("/all", cartController.getAllCarts);

// //Find unique by id
router.get("/:id", cartController.getCartById);

module.exports = router;
