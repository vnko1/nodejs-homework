const phoneNumberRegex =
  /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;

const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const subsciptionList = ["starter", "pro", "business"];

const emailFrom = "andreyvalenko@gmail.com";

module.exports = { phoneNumberRegex, emailRegex, subsciptionList, emailFrom };
