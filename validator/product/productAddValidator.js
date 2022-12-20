const Joi = require("joi");
const schema = Joi.object({
  title: Joi.string().required().min(5).max(200).trim(),
  description: Joi.string().required().min(10).max(500).trim(),
  sizes: Joi.array().items(
    Joi.object({
      size: Joi.string().empty().required().trim(),
      qtd: Joi.number().required().min(1).max(1000),
    })
  ),
  category: Joi.string().min(20).max(30).required().trim(),
  price: Joi.number().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  images: Joi.array(),
});
module.exports = schema;
