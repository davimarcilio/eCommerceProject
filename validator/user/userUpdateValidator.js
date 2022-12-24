const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(3).max(50).trim(),
  cpf: Joi.string().min(11).trim(),
  email: Joi.string().email().trim(),
  password: Joi.string().min(6).max(50).trim(),
  phone: Joi.string().min(11).trim(),
  address: Joi.string().min(10).trim(),
  city: Joi.string().min(2).trim(),
  state: Joi.string().min(2).trim(),
  zip: Joi.string().min(5).trim(),
  number: Joi.string().min(1).trim(),
  sex: Joi.string().valid("M", "F"),
  birthDate: Joi.date().timestamp(),
});
module.exports = schema;
