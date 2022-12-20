const express = require("express");
const router = express.Router();
const categoryJoinProductController = require("../controllers/categoryJoinProductController");

router.get("/:id", categoryJoinProductController.join);

module.exports = router;
