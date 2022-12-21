const Joi = require("joi");
const schema = Joi.object({
  password: Joi.string().required().min(6).max(100).trim(),
  email: Joi.string().email().required().trim(),
});
module.exports = schema;
