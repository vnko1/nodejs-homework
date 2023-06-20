const {
  findAll,
  find,
  create,
  edit,
  remove,
} = require("./contactsDb/contactsDb");

const { findUserByEmail, createUser } = require("./usersDb/usersDb");

module.exports = {
  findAll,
  find,
  create,
  edit,
  remove,
  findUserByEmail,
  createUser,
};
