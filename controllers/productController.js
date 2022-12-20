const ProductModel = require("../models/Product");
const productAddValidator = require("../validator/product/productAddValidator");
const productUpdateValidator = require("../validator/product/productUpdateValidator");
const productARImageValidator = require("../validator/product/productARImageValidator");
module.exports = {
  addProduct: async (req, res) => {
    const { error } = productAddValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
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
    const { error } = productUpdateValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      await ProductModel.findByIdAndUpdate(req.params.id, req.body);
      const docUpdated = await ProductModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteProductById: async (req, res) => {
    try {
      const doc = await ProductModel.findByIdAndDelete(req.params.id);
      if (!!!doc) {
        return res.status(200).send("product is already deleted");
      }
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateImageProductById: async (req, res) => {
    const { error } = productARImageValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      const selectedProduct = await ProductModel.findById(req.params.id);
      await ProductModel.findByIdAndUpdate(req.params.id, {
        images: [...selectedProduct.images, req.body.imageUrl],
      });
      const docUpdated = await ProductModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  removeImageProductById: async (req, res) => {
    const { error } = productARImageValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      const selectedProduct = await ProductModel.findById(req.params.id);
      const filteredImages = selectedProduct.images.filter(
        (imageUrl) => imageUrl !== req.body.imageUrl
      );
      await ProductModel.findByIdAndUpdate(req.params.id, {
        images: filteredImages,
      });
      const docUpdated = await ProductModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
