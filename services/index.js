const {
  findAll,
  find,
  create,
  edit,
  remove,
} = require("./contactsDb/contactsDb");

const {
  findUserByQuery,
  createUser,
  updateUser,
  findUserById,
} = require("./usersDb/usersDb");

module.exports = {
  findAll,
  find,
  create,
  edit,
  remove,
  findUserByQuery,
  createUser,
  updateUser,
  findUserById,
};
