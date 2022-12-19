const CardModel = require("../models/Cart");
module.exports = {
  addCart: async (req, res) => {
    try {
      const Cart = new CardModel(req.body);
      const doc = await Cart.save();
      return res.status(201).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getAllCarts: async (req, res) => {
    try {
      const doc = await CartModel.find({});
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getCartById: async (req, res) => {
    try {
      const doc = await CartModel.findById(req.params.id);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateCartById: async (req, res) => {
    try {
      const selectedCart = await CardModel.findById(req.params.id);
      let teste = selectedCart.products.map((product) => {
        if (product.productId === req.body.products.productId) {
          product.productQtd++;
          return product;
        } else {
          return product;
        }
      });
      if (!!teste) {
        const doc = await CardModel.findByIdAndUpdate(req.params.id, {
          ...req.body,
        });
        console.log(doc);
      } else {
        const doc = await CardModel.findByIdAndUpdate(req.params.id, {
          ...req.body,
          products: teste,
        });
        console.log(doc);
      }

      const docUpdated = await CardModel.findById(req.params.id);
      return res.status(200).json(docUpdated);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
