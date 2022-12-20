const Joi = require("joi");
const schema = Joi.object({
  userId: Joi.string().required().min(20).max(40).trim(),
});
module.exports = schema;
