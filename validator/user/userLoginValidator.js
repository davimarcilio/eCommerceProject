const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().required().min(3).max(50).trim(),
  email: Joi.string().email().required().trim(),
});
module.exports = schema;
