const { Contact } = require("../../models");

class Contacts {
  static async findAll({ favorite, owner, search, page, limit }) {
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
    const contacts = await Contact.find(findOptions)
      .skip(perPage)
      .limit(limit)
      .sort({ favorite: "desc" });

    const total = await Contact.count(findOptions);

    return { contacts, total };
  }

  static find(id) {
    return Contact.findById(id);
  }

  static create(newContact) {
    return Contact.create(newContact);
  }

  static edit(id, contact) {
    return Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });
  }

  static remove(id) {
    return Contact.findByIdAndDelete(id);
  }
}

module.exports = {
  Contacts,
};
