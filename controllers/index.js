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
  login,
  logout,
  current,
  subscriptionUpdate,
} = require("./users/usersControllers");

module.exports = {
  getAll,
  getById,
  add,
  editById,
  deleteById,
  updateStatusContact,
  register,
  login,
  logout,
  current,
  subscriptionUpdate,
};
