const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const registerValidate = require("../validator/user/userRegisterValidator");
const loginValidate = require("../validator/user/userLoginValidator");
const updateValidate = require("../validator/user/userUpdateValidator");
const userAddImageValidator = require("../validator/user/userAddImageValidator");
const CPF = require("cpf-check");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  addUser: async (req, res) => {
    const { error } = registerValidate.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const selectedUserEmail = await UserModel.findOne({
      email: req.body.email,
    });
    if (selectedUserEmail) {
      return res.status(400).send("Email already registered");
    }
    const selectedUserCpf = await UserModel.findOne({
      cpf: req.body.cpf,
    });
    if (selectedUserCpf) {
      return res.status(400).send("CPF already registered");
    }
    if (!CPF.validate(req.body.cpf)) {
      return res.status(400).send("Please enter a valid CPF");
    }

    const User = new UserModel({
      ...req.body,

      name: req.body.name,
      cpf: req.body.cpf,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      sex: req.body.sex,
      birthDate: req.body.birthDate,
    });
    try {
      const doc = await User.save();
      return res
        .status(201)
        .json({ doc, success: "user successfully created" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    const { error } = loginValidate.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    try {
      const selectedUser = await UserModel.findOne({ email: req.body.email });
      if (!selectedUser) {
        return res.status(400).send("Email don`t exists");
      }
      if (!bcrypt.compareSync(req.body.password, selectedUser.password)) {
        return res.status(400).send("Password is incorrect");
      }
      const token = jwt.sign(
        {
          id: selectedUser._id,
        },
        process.env.SECRET_JWT,
        { expiresIn: "7d" }
      );
      return res.status(200).header("authorization-token", token).json({
        _id: selectedUser._id,
        success: true,
        message: "User has been loged successfully",
        authorizationToken: token,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getAllUser: async (req, res) => {
    try {
      const doc = await UserModel.find({});
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const doc = await UserModel.findById(req.params.id);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateUserById: async (req, res) => {
    const { error } = updateValidate.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      await UserModel.findByIdAndUpdate(req.params.id, req.body);
      const docUpdated = await UserModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addImageUser: async (req, res) => {
    const { error } = userAddImageValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      await UserModel.findByIdAndUpdate(req.params.id, {
        image: req.body.imageUrl,
      });
      const updateUser = await UserModel.findById(req.params.id);
      res.status(200).json(updateUser);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const doc = await UserModel.findByIdAndDelete(req.params.id);
      if (!!!doc) {
        return res.status(200).send("user already deleted");
      }
      res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getIdByAuthData: async (req, res) => {
    // try {
    jwt.verify(
      req.params.auth,
      process.env.SECRET_JWT,
      function (err, decoded) {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).json(decoded);
      }
    );
  },
};
