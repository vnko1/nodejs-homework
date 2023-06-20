const express = require("express");

const {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
} = require("../../schema");

const { fieldValidation, isValidId } = require("../../middlewares");

const {
  getAll,
  getById,
  add,
  editById,
  deleteById,
  updateStatusContact,
} = require("../../controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post(
  "/",
  fieldValidation(addContactSchema, "Missing required name field"),
  add
);

router.put(
  "/:contactId",
  isValidId,
  fieldValidation(editContactSchema, "Missing fields"),
  editById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  fieldValidation(editFavoriteContactSchema, "Missing field favorite"),
  updateStatusContact
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
