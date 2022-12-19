const mongoose = require("mongoose");
const productsSchematic = new mongoose.Schema({
  productId: { type: String, required: true },
  productSize: { type: String, required: true },
  productQtd: { type: Number, required: true, default: 1 },
});
const cartSchematic = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [productsSchematic],
});

module.exports = mongoose.model("CartModel", cartSchematic);
