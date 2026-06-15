const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    phone: {
      type: String,
      default: null,
    },

    avatarUrl: {
      type: String,
      default: null,
    },

    roles: {
      type: [String],
      enum: ["buyer", "seller"],
      default: ["buyer"],
    },

    accountStatus: {
      type: String,
      enum: ["active", "suspended", "banned"],
      default: "active",
    },

    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetExpiry: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    // Auto adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;