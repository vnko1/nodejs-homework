const { Contacts } = require("./contactsDb/contactsDb");

const { Users } = require("./usersDb/usersDb");

const { ImageService } = require("./imageServices/imageServices");
const { Email } = require("./emailService/emailService");

module.exports = {
  Contacts,
  Users,
  ImageService,
  Email,
};
