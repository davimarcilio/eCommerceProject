const CartModel = require("../../models/Cart");
const UserModel = require("../../models/User");

module.exports = {
  join: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      const userCart = await CartModel.findOne({ userId: req.params.id });
      return res.status(200).json({
        user,
        cart: userCart,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
