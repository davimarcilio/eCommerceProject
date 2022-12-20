const Joi = require("joi");
const schema = Joi.object({
  title: Joi.string().min(5).max(200).trim(),
  description: Joi.string().min(10).max(500).trim(),
  sizes: Joi.array().items(
    Joi.object({
      size: Joi.string().empty().trim(),
      qtd: Joi.number().min(1).max(1000),
    })
  ),
  category: Joi.string().min(20).max(30).trim(),
  price: Joi.number(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  images: Joi.array(),
});
module.exports = schema;
