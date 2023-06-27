const { fieldValidation, isValidId } = require("./bodyValidation");

const { authentificate } = require("./authentificate");

const { upload, checkFile } = require("./upload");

module.exports = {
  fieldValidation,
  isValidId,
  authentificate,
  upload,
  checkFile,
};
