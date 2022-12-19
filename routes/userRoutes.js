const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Insert user on the database
router.post("/add", userController.addUser);
// Update user by id
router.patch("/update/:id", userController.updateUserById);

//Find all
router.get("/all", userController.getAllUser);

//Find unique by id
router.get("/:id", userController.getUserById);

module.exports = router;
