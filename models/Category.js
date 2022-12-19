const mongoose = require("mongoose");

const categorySchematic = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("CategoryModel", categorySchematic);
