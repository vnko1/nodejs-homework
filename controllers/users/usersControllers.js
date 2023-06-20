const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../../services");
const { ApiError, decorCtrWrapper } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (user) throw ApiError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await createUser({ email, password: hashPass });

  res.status(201).json({ user: newUser });
};

module.exports = { register: decorCtrWrapper(register) };
