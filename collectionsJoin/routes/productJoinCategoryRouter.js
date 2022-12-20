const express = require("express");
const router = express.Router();
const productJoinCategoryController = require("../controllers/productJoinCategoryController");

router.get("/:id", productJoinCategoryController.join);

module.exports = router;
