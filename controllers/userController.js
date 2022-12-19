const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  addUser: async (req, res) => {
    const selectedUser = await UserModel.findOne({ email: req.body.email });
    if (selectedUser) {
      return res.status(400).send("Email already registered");
    }

    const User = new UserModel({
      name: req.body.name,
      cpf: req.body.cpf,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      sex: req.body.sex,
      birthDate: req.body.birthDate,
      ...req.body,
    });
    try {
      const doc = await User.save();
      return res.status(201).json(doc);
    } catch (err) {
      return res.status(500).json(err);
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
    try {
      await UserModel.findByIdAndUpdate(req.params.id, req.body);
      const docUpdated = await UserModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
