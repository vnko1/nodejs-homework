const Joi = require("joi");

const { emailRegex, subsciptionList, nameRegex } = require("../../constants");

const authUserSchema = Joi.object({
  name: Joi.string().pattern(nameRegex).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
});

const editUserSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subsciptionList)
    .required(),
});

module.exports = { authUserSchema, editUserSubscription, loginSchema };
