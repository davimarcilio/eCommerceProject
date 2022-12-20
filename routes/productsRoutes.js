const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Insert Product on the database
router.post("/add", productController.addProduct);

//Delete Product on the database

router.delete("/delete/:id", productController.deleteProductById);

// Update Product by id
router.patch("/update/:id", productController.updateProductById);

//Find all
router.get("/all", productController.getAllProduct);

//Find unique by id
router.get("/:id", productController.getProductById);

module.exports = router;
