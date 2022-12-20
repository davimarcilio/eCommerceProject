const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const registerValidate = require("../validator/user/userRegisterValidator");
const loginValidate = require("../validator/user/userLoginValidator");
const updateValidate = require("../validator/user/userUpdateValidator");
const CPF = require("cpf-check");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  addUser: async (req, res) => {
    const { error } = registerValidate.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const selectedUser = await UserModel.findOne({ email: req.body.email });
    if (selectedUser) {
      return res.status(400).send("Email already registered");
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
      return res.status(201).json(doc);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    const { error } = loginValidate.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const selectedUser = await UserModel.findOne({ email: req.body.email });
    if (!selectedUser) {
      return res.status(400).send("Email is not exist");
    }
    if (!bcrypt.compareSync(req.body.password, selectedUser.password)) {
      return res.status(400).send("Password is incorrect");
    }
    const token = jwt.sign(
      {
        _id: selectedUser._id,
        name: selectedUser.name,
        email: selectedUser.email,
        sex: selectedUser.sex,
        admin: !!selectedUser.admin ? true : false,
      },
      process.env.SECRET_JWT,
      { expiresIn: "7d" }
    );
    return res.header("authorization-token", token);
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
    if (!CPF.validate(req.body.cpf)) {
      return res.status(400).send("Please enter a valid CPF");
    }
    try {
      await UserModel.findByIdAndUpdate(req.params.id, req.body);
      const docUpdated = await UserModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
