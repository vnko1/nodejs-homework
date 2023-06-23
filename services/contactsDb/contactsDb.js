const { Contact } = require("../../models");

const findAll = async ({ favorite, owner, search, page, limit }) => {
  const perPage = page > 0 ? (page - 1) * limit : 0;
  const findOptions = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : { owner };

  if (search && favorite) {
    findOptions.$or.forEach((item) => {
      item.favorite = favorite;
      item.owner = owner;
    });
  } else if (search) {
    findOptions.$or.forEach((item) => {
      item.owner = owner;
    });
  } else if (favorite) {
    findOptions.favorite = favorite;
  }
  const contacts = await Contact.find(findOptions).skip(perPage).limit(limit);

  const total = await Contact.count(findOptions);

  return { contacts, total };
};

const find = (id) => Contact.findById(id);

const create = (newContact) => Contact.create(newContact);

const edit = (id, contact) =>
  Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });

const remove = (id) => Contact.findByIdAndDelete(id);

module.exports = {
  findAll,
  find,
  create,
  edit,
  remove,
};
