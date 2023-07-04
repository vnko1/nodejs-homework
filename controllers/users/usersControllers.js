const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const { Users, ImageService, Email } = require("../../services");
const { ApiError, decorCtrWrapper, hashEmail } = require("../../utils");

const { JWT_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findUserByQuery({ email });

  if (user) throw ApiError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);

  const avatarURL = `https://www.gravatar.com/avatar/${hashEmail(
    email
  )}.jpg?d=robohash`;

  const verificationToken = nanoid();

  const newUser = await Users.createUser({
    email,
    password: hashPass,
    avatarURL,
    verificationToken,
  });

  await Email.send(email, verificationToken);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await Users.findUserByQuery({ verificationToken });

  if (!user) throw ApiError(404, "User not found");

  await Users.updateUser(user.id, { verify: true, verificationToken: null });

  // res.render("verifyMessage");

  res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await Users.findUserByQuery({ email });

  if (user.verify) throw ApiError(400, "Verification has already been passed");

  await Email.send(email, user.verificationToken);

  res.json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findUserByQuery({ email });

  if (!user) throw ApiError(401, "Email or password is wrong");

  if (!user.verify) throw ApiError(401, "Your email is not verified");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw ApiError(401, "Email or password is wrong");

  const token = jwt.sign({ id: user.id }, JWT_KEY, { expiresIn: "24h" });
  await Users.updateUser(user.id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await Users.updateUser(id, { token: "" });

  res.sendStatus(204);
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ user: { email, subscription } });
};

const subscriptionUpdate = async (req, res) => {
  const { id } = req.user;
  const { body } = req;

  const user = await Users.updateUser(id, body);

  res.json({ user: { email: user.email, subscription: user.subscription } });
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempPath } = req.file;
  const avatarURL = await ImageService.uploadImage(tempPath, 250, 250);

  await Users.updateUser(id, { avatarURL });

  await fs.unlink(tempPath);

  res.json({ avatarURL });
};

module.exports = {
  register: decorCtrWrapper(register),
  login: decorCtrWrapper(login),
  logout: decorCtrWrapper(logout),
  current: decorCtrWrapper(current),
  subscriptionUpdate: decorCtrWrapper(subscriptionUpdate),
  updateAvatar: decorCtrWrapper(updateAvatar),
  verifyEmail: decorCtrWrapper(verifyEmail),
  resendVerifyEmail: decorCtrWrapper(resendVerifyEmail),
};
