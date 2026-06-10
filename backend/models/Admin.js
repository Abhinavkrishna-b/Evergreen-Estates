const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
      select: false,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    //PERMISSIONS
    // Each permission maps to an admin route:
    // view_dashboard    → /admin
    // manage_properties → /admin/properties
    // manage_users      → /admin/users
    // verify_properties → /admin/verifications
    // manage_settings   → /admin/settings

    permissions: {
      type: [String],
      enum: [
        "view_dashboard",
        "manage_properties",
        "manage_users",
        "verify_properties",
        "manage_settings",
      ],
      default: [
        "view_dashboard",
        "manage_properties",
        "manage_users",
        "verify_properties",
        "manage_settings",
      ],
    },

    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetExpiry: {
      type: Date,
      default: null,
    },

    activity: {
      propertiesApproved: { type: Number, default: 0 },
      propertiesRejected: { type: Number, default: 0 },
      usersSuspended:     { type: Number, default: 0 },
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;