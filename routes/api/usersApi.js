const express = require("express");

const { authUserSchema, editUserSubscription } = require("../../schema");

const {
  fieldValidation,
  authentificate,
  upload,
} = require("../../middlewares");

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

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

module.exports = router;
