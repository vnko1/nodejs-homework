const sgMail = require("@sendgrid/mail");
const { emailFrom } = require("../../constants");

const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

class Email {
  static async send(email, verificationToken) {
    const msg = {
      from: emailFrom,
      to: email,
      subject: "Verify email",
      html: `<a href='${BASE_URL}/users/verify/${verificationToken}' target='_blank'>Verify email</a>`,
    };

    await sgMail.send(msg);
  }
}

module.exports = { Email };
