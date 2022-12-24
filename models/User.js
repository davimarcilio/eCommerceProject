const mongoose = require("mongoose");

const userSchematic = new mongoose.Schema({
  name: { type: String, required: true, minlenght: 3, maxlenght: 50 },
  cpf: { type: String, required: true, minlengh: 11 },
  email: { type: String, required: true, minlengh: 5, maxlenght: 50 },
  password: { type: String, required: true, minlengh: 6, maxlenght: 20 },
  phone: { type: String, required: false, default: "" },
  address: { type: String, required: false, default: "" },
  number: { type: String, required: false, default: "" },
  city: { type: String, required: false, default: "" },
  state: { type: String, required: false, default: "" },
  zip: { type: String, required: false, default: "" },
  sex: { type: String, required: true, enum: ["M", "F"] },
  admin: { type: Boolean, required: false },
  createdAt: { type: Date, required: true, default: new Date() },
  birthDate: { type: Date, required: true },
  image: { type: String, required: false, default: null },
});

module.exports = mongoose.model("UserModel", userSchematic);
