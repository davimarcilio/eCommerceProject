const CategoryModel = require("../../models/Category");
const ProductModel = require("../../models/Product");

module.exports = {
  join: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      const category = await CategoryModel.findOne({ _id: product.categoryId });
      return res.status(200).json({
        product,
        category,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
