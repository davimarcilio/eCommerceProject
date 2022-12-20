const CategoryModel = require("../models/Category");
const categoryAddValidator = require("../validator/category/categoryAddValidator");
const categoryUpdateValidator = require("../validator/category/categoryUpdateValidator");

module.exports = {
  addCategory: async (req, res) => {
    const { error } = categoryAddValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
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
    const { error } = categoryUpdateValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      await CategoryModel.findByIdAndUpdate(req.params.id, req.body);
      const docUpdated = await CategoryModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteCategoryById: async (req, res) => {
    try {
      const doc = await CategoryModel.findByIdAndRemove(req.params.id);
      if (!!!doc) {
        return res.status(200).send("category already deleted");
      }
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
