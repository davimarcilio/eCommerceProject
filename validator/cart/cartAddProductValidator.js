const Joi = require("joi");
const schema = Joi.object({
  productId: Joi.string().required().min(20).max(40).trim(),
  productSizeId: Joi.string().required().min(20).max(40).trim(),
  productSize: Joi.string().required().min(1).max(10).trim(),
});
module.exports = schema;
