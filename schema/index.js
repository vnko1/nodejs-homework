const {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
} = require("./contacts/contactsValidationSchema");

const {
  authUserSchema,
  editUserSubscription,
  emailSchema,
} = require("./users/usersValidationSchema");

module.exports = {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
  authUserSchema,
  editUserSubscription,
  emailSchema,
};
