const {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
} = require("./contacts/contactsValidationSchema");

const { authUserSchema } = require("./users/usersValidationSchema");

module.exports = {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
  authUserSchema,
};
