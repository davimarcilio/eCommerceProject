const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().required().min(3).max(50).trim(),
  cpf: Joi.string().required().min(11).trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(6).max(50).trim(),
  phone: Joi.string().min(11).trim(),
  address: Joi.string().min(10).trim(),
  city: Joi.string().min(2).trim(),
  state: Joi.string().min(2).trim(),
  zip: Joi.string().min(5).trim(),
  sex: Joi.string().valid("M", "F"),
  birthDate: Joi.date().timestamp(),
});
module.exports = schema;
