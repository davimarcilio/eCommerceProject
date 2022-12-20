const express = require("express");
const router = express.Router();
const searchProductsController = require("../controllers/searchProductsController");
router.get("/", searchProductsController.search);

module.exports = router;
