const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Insert user on the database
router.post("/add", userController.addUser);

//Login user on the client side
router.post("/login", userController.loginUser);

//Delete user on the database
router.delete("/delete/:id", userController.deleteUserById);

// Update user by id
router.patch("/update/:id", userController.updateUserById);

//Add image to user
router.patch("/image/add/:id", userController.addImageUser);

//Find all
router.get("/all", userController.getAllUser);

//Find unique by id
router.get("/:id", userController.getUserById);

module.exports = router;
