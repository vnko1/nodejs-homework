const express = require("express");

const { authUserSchema, editUserSubscription } = require("../../schema");

const {
  fieldValidation,
  authentificate,

  checkFile,
} = require("../../middlewares");

const { ImageService } = require("../../services");

const {
  register,
  login,
  logout,
  current,
  subscriptionUpdate,
  updateAvatar,
} = require("../../controllers");

const router = express.Router();

router.patch(
  "/",
  authentificate,
  fieldValidation(editUserSubscription),
  subscriptionUpdate
);

router.post("/register", fieldValidation(authUserSchema), register);

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
