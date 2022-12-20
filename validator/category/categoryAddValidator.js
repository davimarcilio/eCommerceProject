const Joi = require("joi");
const schema = Joi.object({
  title: Joi.string().required().min(2).max(200).trim(),
  description: Joi.string().required().min(5).max(500).trim(),
});
module.exports = schema;
