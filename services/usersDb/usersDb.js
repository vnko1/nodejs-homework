const { User } = require("../../models");

const findUserByQuery = (email) => User.findOne({ email });

const findUserById = (id) => User.findById(id);

const createUser = (newUser) => User.create(newUser);

const updateUser = (id, newData) =>
  User.findByIdAndUpdate(id, newData, { new: true });

const updateUserAvatar = (id, newAvatar) =>
  User.findByIdAndUpdate(id, { newAvatar });

module.exports = {
  findUserByQuery,
  createUser,
  updateUser,
  findUserById,
  updateUserAvatar,
};
