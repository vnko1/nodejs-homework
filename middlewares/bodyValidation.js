const { isValidObjectId } = require("mongoose");
const { ApiError } = require("../utils");

const fieldValidation = (schema, message) => (req, _, next) => {
  const { body } = req;

  const { error, value } = schema.validate(body);

  if (error && message === "userValidation")
    return next(ApiError(400, error.message));

  if (error) return next(ApiError(400, message));

  req.body = value;
  next();
};

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId))
    next(ApiError(400, `${contactId} is not valid id`));

  next();
};

module.exports = { fieldValidation, isValidId };
