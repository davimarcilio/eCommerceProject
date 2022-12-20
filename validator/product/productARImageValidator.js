const Joi = require("joi");
const schema = Joi.object({
  images: Joi.string().required(),
});
module.exports = schema;
