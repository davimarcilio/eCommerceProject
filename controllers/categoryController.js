const CategoryModel = require("../models/Category");
module.exports = {
  addCategory: async (req, res) => {
    try {
      const Category = new CategoryModel(req.body);
      const doc = await Category.save();
      return res.status(201).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const doc = await CategoryModel.find({});
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const doc = await CategoryModel.findById(req.params.id);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateCategoryById: async (req, res) => {
    try {
      await CategoryModel.findByIdAndUpdate(req.params.id, req.body);
      const docUpdated = await CategoryModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
