const express = require("express");
const router = express.Router();

const userJoinCartRouter = require("./routes/userJoinCartRoutes");
const productJoinCategoryRouter = require("./routes/productJoinCategoryRouter");
const categoryJoinProductRouter = require("./routes/categoryJoinProductRouter");

router.use("/usercart", userJoinCartRouter);
router.use("/productcategory", productJoinCategoryRouter);
router.use("/categoryproduct", categoryJoinProductRouter);

module.exports = router;
