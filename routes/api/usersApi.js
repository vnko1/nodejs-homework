const express = require("express");

const { authUserSchema, editUserSubscription } = require("../../schema");

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
  fieldValidation(editUserSubscription, "userValidation"),
  subscriptionUpdate
);

router.post(
  "/register",
  fieldValidation(authUserSchema, "userValidation"),
  register
);

router.post("/login", fieldValidation(authUserSchema, "userValidation"), login);

router.post("/logout", authentificate, logout);

router.post("/current", authentificate, current);

module.exports = router;
