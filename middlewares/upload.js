const { ApiError } = require("../utils");

const checkFile = (req, res, next) => {
  if (!req.file) next(ApiError(400, "Bad request"));
  next();
};

module.exports = { checkFile };
