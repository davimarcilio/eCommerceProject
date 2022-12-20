const express = require("express");
const router = express.Router();

const searchProductsRoutes = require("./routes/searchProductsRoutes");
const searchProductsWithCategoryRoutes = require("./routes/searchProductsWithCategoryRoutes");
router.use("/products", searchProductsRoutes);

router.use("/products/category", searchProductsWithCategoryRoutes);

module.exports = router;
