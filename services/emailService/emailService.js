const sgMail = require("@sendgrid/mail");
const { emailFrom } = require("../../constants");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

class Email {
  static async send(email, protocol, host, verificationToken) {
    const msg = {
      from: emailFrom,
      to: email,
      subject: "Verify email",
      html: `<a href='${protocol}://${host}/users/verify/${verificationToken}' target='_blank'>Verify email</a>`,
    };

    await sgMail.send(msg);
  }
}

module.exports = { Email };
