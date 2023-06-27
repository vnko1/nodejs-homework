const { User } = require("../../models");

const findUserByQuery = (email) => User.findOne({ email });

const findUserById = (id) => User.findById(id);

const createUser = (newUser) => User.create(newUser);

const updateUser = (id, newData) =>
  User.findByIdAndUpdate(id, newData, { new: true });

class Users {
  static findUserByQuery(email) {
    return User.findOne({ email });
  }

  static findUserById(id) {
    return User.findById(id);
  }

  static createUser(newUser) {
    return User.create(newUser);
  }

  static updateUser(id, newData) {
    return User.findByIdAndUpdate(id, newData, { new: true });
  }
}

module.exports = {
  findUserByQuery,
  createUser,
  updateUser,
  findUserById,
  Users,
};
