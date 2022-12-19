const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

//Insert Product on the database
router.post("/add", cartController.addCart);
// // Update Product by id
router.patch("/update/:id", cartController.updateCartById);

// //Find all
router.get("/all", cartController.getAllCarts);

// //Find unique by id
router.get("/:id", cartController.getCartById);

module.exports = router;
