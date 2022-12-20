const CategoryModel = require("../../models/Category");
const ProductModel = require("../../models/Product");

module.exports = {
  join: async (req, res) => {
    try {
      const category = await CategoryModel.findById(req.params.id);
      const products = await ProductModel.find({ categoryId: req.params.id });
      return res.status(200).json({
        category,
        products,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
