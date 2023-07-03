const express = require("express");

const {
  authUserSchema,
  editUserSubscription,
  emailSchema,
} = require("../../schema");

const {
  fieldValidation,
  authentificate,
  checkFile,
} = require("../../middlewares");

const { ImageService } = require("../../services");

const {
  register,
  verifyEmail,
  login,
  logout,
  current,
  subscriptionUpdate,
  updateAvatar,
  resendVerifyEmail,
} = require("../../controllers");

const router = express.Router();

router.patch(
  "/",
  authentificate,
  fieldValidation(editUserSubscription),
  subscriptionUpdate
);

router.post("/register", fieldValidation(authUserSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post(
  "/verify",
  fieldValidation(emailSchema, "missing required field email"),
  resendVerifyEmail
);

router.post("/login", fieldValidation(authUserSchema), login);

router.post("/logout", authentificate, logout);

router.post("/current", authentificate, current);

router.patch(
  "/avatars",
  authentificate,
  ImageService.upload("avatar"),
  checkFile,
  updateAvatar
);

module.exports = router;
