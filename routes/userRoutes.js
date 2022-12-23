const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtValidator = require("../auth/jwtValidator");
//Insert user on the database
router.post("/add", userController.addUser);

//Login user on the client side
router.post("/login", userController.loginUser);

//Delete user on the database
router.delete("/delete/:id", jwtValidator, userController.deleteUserById);

// Update user by id
router.patch("/update/:id", jwtValidator, userController.updateUserById);

//Add image to user
router.patch("/image/add/:id", jwtValidator, userController.addImageUser);

//Find all
router.get("/all", jwtValidator, userController.getAllUser);

//Find id by JWTTOKEN
router.get("/token/:auth", jwtValidator, userController.getIdByAuthData);

//Find unique by id
router.get("/:id", jwtValidator, userController.getUserById);

module.exports = router;
