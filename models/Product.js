const mongoose = require("mongoose");
const sizes = new mongoose.Schema({
  size: { type: String, required: true },
  qtd: { type: Number, required: true },
});

const productSchematic = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  sizes: [sizes],
  //sizes have a array of objects example [{
  // 	"size": "GG",
  // 	"qtd": 6
  // }, {
  //     "size": "P",
  //     "qtd": 2
  // }]
  price: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: null },
  images: [String],
});

module.exports = mongoose.model("ProductModel", productSchematic);
