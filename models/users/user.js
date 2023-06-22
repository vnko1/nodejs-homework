const { Schema, model } = require("mongoose");

const { emailRegex } = require("../../constants");

const { schemaError } = require("../../utils");

const userSchema = new Schema(
  {
    name: { type: String },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", schemaError);

const User = model("user", userSchema);

module.exports = User;
