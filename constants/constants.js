const phoneNumberRegex = /^[(]\d{3}[)][ ]\d{3}[-]\d{4}$/;

const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

module.exports = { phoneNumberRegex, emailRegex };
