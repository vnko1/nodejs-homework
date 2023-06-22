const {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
} = require("./contacts/contactsValidationSchema");

const {
  authUserSchema,
  editUserSubscription,
  loginSchema,
} = require("./users/usersValidationSchema");

module.exports = {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
  authUserSchema,
  editUserSubscription,
  loginSchema,
};
