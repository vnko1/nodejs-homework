const { User } = require("../../models");

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
  Users,
};
