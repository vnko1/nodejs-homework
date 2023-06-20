const Joi = require("joi");

const { emailRegex } = require("../../constants");

const authUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});

module.exports = { authUserSchema };
