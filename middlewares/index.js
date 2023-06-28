const { fieldValidation, isValidId } = require("./bodyValidation");

const { authentificate } = require("./authentificate");

const { checkFile } = require("./upload");

module.exports = {
  fieldValidation,
  isValidId,
  authentificate,
  checkFile,
};
