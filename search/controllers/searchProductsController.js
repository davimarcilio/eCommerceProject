const ProductModel = require("../../models/Product");

module.exports = {
  search: async (req, res) => {
    try {
      const docs = await ProductModel.find({
        title: new RegExp(req.query.search, "i"),
      });
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
