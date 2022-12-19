const ProductModel = require("../models/Product");
module.exports = {
  addProduct: async (req, res) => {
    try {
      const Product = new ProductModel(req.body);
      const doc = await Product.save();
      return res.status(201).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const doc = await ProductModel.find({});
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getProductById: async (req, res) => {
    try {
      const doc = await ProductModel.findById(req.params.id);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateProductById: async (req, res) => {
    try {
      await ProductModel.findByIdAndUpdate(req.params.id, req.body);
      const docUpdated = await ProductModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
