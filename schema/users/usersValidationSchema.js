const Joi = require("joi");

const { emailRegex, subsciptionList } = require("../../constants");

const authUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});

const editUserSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subsciptionList)
    .required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

module.exports = { authUserSchema, editUserSubscription, emailSchema };
