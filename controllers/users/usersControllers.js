const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const {
  findUserByQuery,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../../services");
const { ApiError, decorCtrWrapper } = require("../../utils");

const avatarsPath = path.join(__dirname, "../../", "public", "avatars");

const { JWT_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByQuery(email);
  if (user) throw ApiError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await createUser({ email, password: hashPass, avatarURL });

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

const logout = async (req, res) => {
  const { id } = req.user;

  await updateUser(id, { token: "" });

  res.sendStatus(204);
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ user: { email, subscription } });
};

const subscriptionUpdate = async (req, res) => {
  const { id } = req.user;
  const { body } = req;

  const user = await updateUser(id, body);

  res.json({ user: { email: user.email, subscription: user.subscription } });
};
const { User } = require("../../models");
const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const fileName = id + "_" + originalname;

  const publicPath = path.join(avatarsPath, fileName);

  await fs.rename(tempPath, publicPath);
  const avatarURL = path.join("avatars", fileName);

  await updateUserAvatar(id, avatarURL);

  res.json({ avatarURL });
};

module.exports = {
  register: decorCtrWrapper(register),
  login: decorCtrWrapper(login),
  logout: decorCtrWrapper(logout),
  current: decorCtrWrapper(current),
  subscriptionUpdate: decorCtrWrapper(subscriptionUpdate),
  updateAvatar: decorCtrWrapper(updateAvatar),
};
