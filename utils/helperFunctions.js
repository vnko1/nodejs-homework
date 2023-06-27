const crypto = require("crypto");

const ApiError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const schemaError = (error, doc, next) => {
  error.status = 400;
  next();
};

const hashEmail = (email) =>
  crypto.createHash("md5").update(email).digest("hex");

module.exports = { ApiError, schemaError, hashEmail };
