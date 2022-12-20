const CartModel = require("../models/Cart");

const cartAddValidator = require("../validator/cart/cartAddValidator");
const cartAddProductValidator = require("../validator/cart/cartAddProductValidator");
const cartRDIProductValidator = require("../validator/cart/cartRDIProductValidator");

function productOperator(product, req) {
  return (
    product.productId === req.body.productId &&
    product.productSizeId === req.body.productSizeId
  );
}
function productMapper(product, operator) {
  return {
    productId: product.productId,
    productSize: product.productSize,
    productSizeId: product.productSizeId,
    productQtd: product.productQtd + (operator ? +1 : -1),
    _id: product._id,
  };
}

module.exports = {
  addCart: async (req, res) => {
    const { error } = cartAddValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      const cartExists = await CartModel.find({ userId: req.body.userId });
      if (cartExists.length >= 1) {
        return res.status(400).send("Cart already exists");
      }
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

  addProductOnCartById: async (req, res) => {
    const { error } = cartAddProductValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      const selectedProducts = await CartModel.findById(req.params.id);

      const existSizeProduct = selectedProducts.products.filter(
        (product) => product.productSizeId === req.body.productSizeId
      );
      if (existSizeProduct.length > 0) {
        return res.status(400).send("Product size already exists");
      }

      await CartModel.findByIdAndUpdate(req.params.id, {
        products: [...selectedProducts.products, req.body],
      });
      const updatedCart = await CartModel.findById(req.params.id);
      return res.status(200).send(updatedCart);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  incrementProductFromCartById: async (req, res) => {
    const { error } = cartRDIProductValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      const selectedProducts = await CartModel.findById(req.params.id);
      const incrementedProduct = selectedProducts.products.map((product) => {
        if (productOperator(product, req)) {
          return productMapper(product, true);
        } else {
          return product;
        }
      });
      await CartModel.findByIdAndUpdate(req.params.id, {
        products: incrementedProduct,
      });
      const updatedCart = await CartModel.findById(req.params.id);
      return res.status(200).send(updatedCart);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  decrementProductFromCartById: async (req, res) => {
    const { error } = cartRDIProductValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      const selectedProducts = await CartModel.findById(req.params.id);
      const incrementedProduct = selectedProducts.products.map((product) => {
        if (productOperator(product, req)) {
          return productMapper(product, false);
        } else {
          return product;
        }
      });
      await CartModel.findByIdAndUpdate(req.params.id, {
        products: incrementedProduct,
      });
      const updatedCart = await CartModel.findById(req.params.id);
      return res.status(200).send(updatedCart);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  removeProductFromCartById: async (req, res) => {
    const { error } = cartRDIProductValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    try {
      const selectedCart = await CartModel.findById(req.params.id);
      const removedProductFromCart = selectedCart.products.filter(
        (product) => product.productId !== req.body.productId
      );
      await CartModel.findByIdAndUpdate(req.params.id, {
        products: removedProductFromCart,
      });
      const updatedCart = await CartModel.findById(req.params.id);
      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  removeCartById: async (req, res) => {
    try {
      const deleteCart = await CartModel.findByIdAndDelete(req.params.id);
      if (!!!deleteCart) {
        return res.status(200).send("cart is already deleted");
      }
      return res.status(200).json(deleteCart);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
