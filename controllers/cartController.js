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
  addProductOnCartById: async (req, res) => {
    try {
      const selectedProducts = await CartModel.findById(req.params.id);
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
    try {
      const selectedProducts = await CartModel.findById(req.params.id);
      const incrementedProduct = selectedProducts.products.map((product) => {
        if (
          product.productId === req.body.productId &&
          product.productSizeId === req.body.productSizeId
        ) {
          return {
            productId: product.productId,
            productSize: product.productSize,
            productSizeId: product.productSizeId,
            productQtd: product.productQtd + 1,
            _id: product._id,
          };
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
    try {
      const selectedProducts = await CartModel.findById(req.params.id);
      const incrementedProduct = selectedProducts.products.map((product) => {
        if (
          product.productId === req.body.productId &&
          product.productSizeId === req.body.productSizeId
        ) {
          return {
            productId: product.productId,
            productSize: product.productSize,
            productSizeId: product.productSizeId,
            productQtd: product.productQtd - 1,
            _id: product._id,
          };
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
};
// try {
//   const selectedCart = await CartModel.findById(req.params.id);
//   const selectedProducts = selectedCart.products;
//   const found = selectedProducts.find(
//     (product) =>
//       product.productId === req.body.products.productId &&
//       product.productSize === req.body.products.productSize
//   );
//   if (!!!found) {
//     await CartModel.findByIdAndUpdate(req.params.id, {
//       products: [...selectedProducts, req.body.products],
//     });
//   } else {
//     selectedProducts.map((product) =>
//       product.productId === req.body.products.productId &&
//       product.productSize === req.body.products.productSize
//         ? product.productQtd++
//         : product
//     );
//     selectedCart.save();
//   }
//   const updatedCart = await CartModel.findById(req.params.id);
