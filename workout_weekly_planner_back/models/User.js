const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"],
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email.`,
      },
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
          return passwordRegex.test(value);
        },
        message:
          "Password must be at least 6 characters long and contain at least one uppercase letter, one special character, and one number.",
      },
      required: [true, "Password is required."],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
