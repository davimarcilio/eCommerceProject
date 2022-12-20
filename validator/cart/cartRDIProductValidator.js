const Joi = require("joi");

//Validator for the remove product field / increment product field  / decrement product field
const schema = Joi.object({
  productId: Joi.string().required().min(20).max(40).trim(),
  productSizeId: Joi.string().required().min(20).max(40).trim(),
});
module.exports = schema;
