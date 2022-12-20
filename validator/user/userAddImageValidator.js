const Joi = require("joi");
const schema = Joi.object({
  imageUrl: Joi.string().required().trim(),
});
module.exports = schema;
