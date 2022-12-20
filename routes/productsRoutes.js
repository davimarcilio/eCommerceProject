const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Insert Product on the database
router.post("/add", productController.addProduct);

//Delete Product on the database

router.delete("/delete/:id", productController.deleteProductById);

// Update Product by id
router.patch("/update/:id", productController.updateProductById);
// add a image to the product
router.patch("/update/image/:id", productController.updateImageProductById);

//remove a image from the product
router.patch("/remove/image/:id", productController.removeImageProductById);

//Find all
router.get("/all", productController.getAllProduct);

//Find unique by id
router.get("/:id", productController.getProductById);

module.exports = router;
