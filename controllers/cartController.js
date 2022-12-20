const CartModel = require("../models/Cart");
module.exports = {
  addCart: async (req, res) => {
    try {
      const Cart = new CartModel(req.body);
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
      const selectedCart = await CartModel.findById(req.params.id);
      const selectedProducts = selectedCart.products;
      const found = selectedProducts.find(
        (product) =>
          product.productId === req.body.products.productId &&
          product.productSize === req.body.products.productSize
      );
      if (!!!found) {
        await CartModel.findByIdAndUpdate(req.params.id, {
          products: [...selectedProducts, req.body.products],
        });
      } else {
        selectedProducts.map((product) =>
          product.productId === req.body.products.productId &&
          product.productSize === req.body.products.productSize
            ? product.productQtd++
            : product
        );
        selectedCart.save();
      }
      const updatedCart = await CartModel.findById(req.params.id);
      return res.status(200).send(updatedCart);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
