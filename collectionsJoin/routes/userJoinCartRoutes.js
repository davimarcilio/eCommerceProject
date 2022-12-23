const express = require("express");
const router = express.Router();
const jwtValidator = require("../../auth/jwtValidator");
const userJoinCartController = require("../controllers/userJoinCartController");

router.get("/:id", jwtValidator, userJoinCartController.join);

module.exports = router;
