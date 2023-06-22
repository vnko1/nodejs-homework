const express = require("express");

const {
  authUserSchema,
  editUserSubscription,
  loginSchema,
} = require("../../schema");

const { fieldValidation, authentificate } = require("../../middlewares");

const {
  register,
  login,
  logout,
  current,
  subscriptionUpdate,
} = require("../../controllers");

const router = express.Router();

router.patch(
  "/",
  authentificate,
  fieldValidation(editUserSubscription),
  subscriptionUpdate
);

router.post("/register", fieldValidation(authUserSchema), register);

router.post("/login", fieldValidation(loginSchema), login);

router.post("/logout", authentificate, logout);

router.post("/current", authentificate, current);

module.exports = router;
