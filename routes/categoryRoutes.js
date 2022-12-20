const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

//Insert category on the database
router.post("/add", categoryController.addCategory);

//Delete category on the database
router.delete("/delete/:id", categoryController.deleteCategoryById);

// // Update category by id
router.patch("/update/:id", categoryController.updateCategoryById);

// //Find all
router.get("/all", categoryController.getAllCategories);

// //Find unique by id
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
