const express = require("express");

const { authUserSchema } = require("../../schema");

const { fieldValidation } = require("../../middlewares");

const { register, login } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  fieldValidation(authUserSchema, "userValidation"),
  register
);

router.post("/login", fieldValidation(authUserSchema, "userValidation"), login);

module.exports = router;
