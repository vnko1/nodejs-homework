const express = require("express");

const { authUserSchema } = require("../../schema");

const { fieldValidation } = require("../../middlewares");

const { register } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  fieldValidation(authUserSchema, "userValidation"),
  register
);

module.exports = router;
