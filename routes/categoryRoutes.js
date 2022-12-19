const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

//Insert Product on the database
router.post("/add", categoryController.addCategory);
// // Update Product by id
router.patch("/update/:id", categoryController.updateCategoryById);

// //Find all
router.get("/all", categoryController.getAllCategories);

// //Find unique by id
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
