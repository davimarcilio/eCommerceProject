const express = require("express");
const router = express.Router();
const userJoinCartController = require("../controllers/userJoinCartController");

router.get("/:id", userJoinCartController.join);

module.exports = router;
