const { User } = require("../../models");

class Users {
  static findUserByQuery(data) {
    const [key] = Object.keys(data);
    const query = { [key]: data[key] };

    return User.findOne(query);
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
