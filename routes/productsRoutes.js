const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product");

//Insert Product on the database
router.post("/add", async (req, res) => {
  try {
    const Product = new ProductModel(req.body);
    const doc = await Product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update Product by id
router.patch("/update/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    const docUpdated = await ProductModel.findById(req.params.id);
    res.status(200).json(docUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Find all
router.get("/all", async (req, res) => {
  try {
    const doc = await ProductModel.find({});
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Find unique by id
router.get("/:id", async (req, res) => {
  try {
    const doc = await ProductModel.findById(req.params.id);
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
