const { User } = require("../../models");

const findUserByEmail = (email) => User.findOne({ email });

const createUser = (newUser) => User.create(newUser);

module.exports = { findUserByEmail, createUser };
