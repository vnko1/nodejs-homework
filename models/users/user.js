const { Schema, model } = require("mongoose");

const { emailRegex } = require("../../constants");

const { schemaError } = require("../../utils");

const userSchema = new Schema(
  {
    password: {
      type: String,
      select: false,
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
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", schemaError);

const User = model("user", userSchema);

module.exports = User;
