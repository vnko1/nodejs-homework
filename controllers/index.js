const {
  getAll,
  getById,
  add,
  editById,
  deleteById,
  updateStatusContact,
} = require("./contacts/contactsControllers");

const { register, login } = require("./users/usersControllers");

module.exports = {
  getAll,
  getById,
  add,
  editById,
  deleteById,
  updateStatusContact,
  register,
  login,
};
