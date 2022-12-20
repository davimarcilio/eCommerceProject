const express = require("express");
const router = express.Router();
const searchProductsWithCategoryController = require("../controllers/searchProductsWithCategoryController");
router.get("/:id", searchProductsWithCategoryController.search);

module.exports = router;
