const { Schema, model } = require("mongoose");

const { phoneNumberRegexp, emailRegex } = require("../../constants");

const { schemaError } = require("../../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegex,
    },
    phone: {
      type: String,
      match: phoneNumberRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", schemaError);
contactSchema.post("find", schemaError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
