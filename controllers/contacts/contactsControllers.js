const { Contacts } = require("../../services");
const { ApiError, decorCtrWrapper } = require("../../utils");

const getAll = async (req, res) => {
  const { id: owner } = req.user;

  const { page = 1, limit = 10, favorite, search } = req.query;

  const { contacts, total } = await Contacts.findAll({
    favorite,
    owner,
    search,
    page,
    limit,
  });

  res.json({ contacts, total });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const response = await Contacts.find(contactId);

  if (!response) throw ApiError(404, "Not found");
  res.json({ contact: response });
};

const add = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;

  const response = await Contacts.create({ ...body, owner });

  res.status(201).json({ contact: response });
};

const editById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const response = await Contacts.edit(contactId, body);

  if (!response) throw ApiError(404, "Not found");

  res.json({ contact: response });
};

const updateStatusContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const response = await Contacts.edit(contactId, body);

  if (!response) throw ApiError(404, "Not found");

  res.json({ contact: response });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const response = await Contacts.remove(contactId);

  if (!response) throw ApiError(404, "Not found");
  res.json({ message: "contact deleted" });
};

module.exports = {
  getAll: decorCtrWrapper(getAll),
  getById: decorCtrWrapper(getById),
  add: decorCtrWrapper(add),
  editById: decorCtrWrapper(editById),
  deleteById: decorCtrWrapper(deleteById),
  updateStatusContact: decorCtrWrapper(updateStatusContact),
};
