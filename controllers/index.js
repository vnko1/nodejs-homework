const {
  getAll,
  getById,
  add,
  editById,
  deleteById,
  updateStatusContact,
} = require("./contacts/contactsControllers");

const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  current,
  subscriptionUpdate,
  updateAvatar,
} = require("./users/usersControllers");

module.exports = {
  getAll,
  getById,
  add,
  editById,
  deleteById,
  updateStatusContact,
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  current,
  subscriptionUpdate,
  updateAvatar,
};
