const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { findUserByQuery, createUser, updateUser } = require("../../services");
const { ApiError, decorCtrWrapper } = require("../../utils");

const { JWT_KEY } = process.env;

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await findUserByQuery(email);
  if (user) throw ApiError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await createUser({ name, email, password: hashPass });

  const token = jwt.sign({ id: newUser.id }, JWT_KEY, { expiresIn: "24h" });

  await updateUser(user.id, { token });

  res.status(201).json({
    token,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      name: newUser.name,
    },
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
    user: {
      email: user.email,
      subscription: user.subscription,
      name: user.name,
    },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await updateUser(id, { token: "" });

  res.sendStatus(204);
};

const current = async (req, res) => {
  const { email, subscription, name } = req.user;
  res.json({ user: { email, subscription, name } });
};

const subscriptionUpdate = async (req, res) => {
  const { id } = req.user;
  const { body } = req;

  const user = await updateUser(id, body);

  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
      name: user.name,
    },
  });
};

module.exports = {
  register: decorCtrWrapper(register),
  login: decorCtrWrapper(login),
  logout: decorCtrWrapper(logout),
  current: decorCtrWrapper(current),
  subscriptionUpdate: decorCtrWrapper(subscriptionUpdate),
};
