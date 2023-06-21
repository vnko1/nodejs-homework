const Joi = require("joi");

const { phoneNumberRegex, emailRegex } = require("../../constants");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneNumberRegex).required(),
  favorite: Joi.boolean(),
});

const editContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().pattern(emailRegex),
  phone: Joi.string().pattern(phoneNumberRegex),
  favorite: Joi.boolean(),
}).or("name", "email", "phone");

const editFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
};
