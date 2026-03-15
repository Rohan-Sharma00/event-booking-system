const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email format"
      }
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"]
    },

    role: {
      type: String,
      required: true,
      enum: {
        values: ["organizer", "customer"],
        message: "{VALUE} is not a valid role"
      }
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };