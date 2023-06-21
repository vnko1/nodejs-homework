const phoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;

const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const subsciptionList = ["starter", "pro", "business"];

module.exports = { phoneNumberRegex, emailRegex, subsciptionList };
