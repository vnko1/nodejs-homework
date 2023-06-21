const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { findUserByQuery, createUser, updateUser } = require("../../services");
const { ApiError, decorCtrWrapper } = require("../../utils");

const { JWT_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByQuery(email);
  if (user) throw ApiError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await createUser({ email, password: hashPass });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByQuery(email);

  if (!user) throw ApiError(401, "Email or password is wrong");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw ApiError(401, "Email or password is wrong");

  const token = jwt.sign({ id: user.id }, JWT_KEY, { expiresIn: "24h" });
  await updateUser(user.id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = {
  register: decorCtrWrapper(register),
  login: decorCtrWrapper(login),
};
