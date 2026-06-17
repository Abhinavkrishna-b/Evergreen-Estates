const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { generateAdminToken } = require("../utils/generateToken");
const Property = require("../models/Property");
const User = require("../models/User");
const BuyerProfile = require("../models/BuyerProfile");
const SellerProfile = require("../models/SellerProfile");

const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check email already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = await Admin.create({
      fullName,
      email,
      passwordHash,
    });

    console.log("Admin registered successfully!");

    // Generate token
    const token = generateAdminToken(
      newAdmin._id,
      newAdmin.permissions
    );

    res.status(201).json({
      success: true,
      message: "Admin registration successful",
      data: {
        admin: {
          id: newAdmin._id,
          fullName: newAdmin.fullName,
          email: newAdmin.email,
          permissions: newAdmin.permissions,
        },
        token,
      },
    });

  } catch (error) {
    console.error("Admin register error:", error.message);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Need passwordHash — override select:false
    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    }).select("+passwordHash");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    admin.lastLoginAt = new Date();
    await admin.save();

    console.log("Admin logged in successfully!");

    const token = generateAdminToken(admin._id, admin.permissions);

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        admin: {
          id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          permissions: admin.permissions,
        },
        token,
      },
    });

  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};


const getAdminMe = async (req, res) => {
  try {
    // req.admin.adminId comes from verifyAdmin middleware
    const admin = await Admin.findById(req.admin.adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          permissions: admin.permissions,
          activity: admin.activity,
          createdAt: admin.createdAt,
          lastLoginAt: admin.lastLoginAt,
        },
      },
    });

  } catch (error) {
    console.error("Get admin me error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin.",
    });
  }
};

// GET ALL PROPERTIES (Admin view)
// GET /api/admin/properties

const getAllPropertiesAdmin = async (req, res) => {
  try {
    const { status, city, propertyType } = req.query;

    const filter = {};
    if (status) filter["verification.status"] = status;
    if (city) filter.city = { $regex: city, $options: "i" };
    if (propertyType) filter.propertyType = propertyType;

    const properties = await Property.find(filter)
      .populate("sellerId", "fullName email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: { properties },
    });

  } catch (error) {
    console.error("Admin get properties error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

// GET PENDING PROPERTIES
// GET /api/admin/properties/pending
const getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      "verification.status": "pending",
    })
      .populate("sellerId", "fullName email phone")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: { properties },
    });

  } catch (error) {
    console.error("Get pending error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending properties",
    });
  }
};

// VERIFY PROPERTY (Approve or Reject)
// PUT /api/admin/properties/:id/verify
const verifyProperty = async (req, res) => {
  try {
    const { action, rejectionReason } = req.body;
    // action: "approve" or "reject"

    if (!action || !["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be approve or reject",
      });
    }

    if (action === "reject" && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const previousStatus = property.verification.status;
    const newStatus = action === "approve" ? "approved" : "rejected";

    // Update verification fields
    property.verification.status = newStatus;
    property.verification.reviewedBy = req.admin.adminId;
    property.verification.reviewedAt = new Date();
    property.verification.rejectionReason =
      action === "reject" ? rejectionReason : null;

    await property.save();

    const statsUpdate = { $inc: {} };

    if (previousStatus === "pending" && newStatus === "approved") {
      statsUpdate.$inc["stats.pendingListings"] = -1;
      statsUpdate.$inc["stats.activeListings"] = 1;
    } else if (previousStatus === "pending" && newStatus === "rejected") {
      statsUpdate.$inc["stats.pendingListings"] = -1;
    } else if (previousStatus === "approved" && newStatus === "rejected") {
      statsUpdate.$inc["stats.activeListings"] = -1;
    }

    await SellerProfile.findOneAndUpdate(
      { userId: property.sellerId },
      statsUpdate
    );

    const activityField =
      action === "approve"
        ? "activity.propertiesApproved"
        : "activity.propertiesRejected";

    await Admin.findByIdAndUpdate(req.admin.adminId, {
      $inc: { [activityField]: 1 },
    });

    res.status(200).json({
      success: true,
      message: `Property ${newStatus} successfully`,
      data: { property },
    });

  } catch (error) {
    console.error("Verify property error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to verify property",
    });
  }
};

// SET BADGE
// PUT /api/admin/properties/:id/badge
const setPropertyBadge = async (req, res) => {
  try {
    const { badge } = req.body;
    // badge can be null to remove badge

    const validBadges = ["Featured", "Hot Deal", "New", "Smart", "Land", null];
    if (!validBadges.includes(badge)) {
      return res.status(400).json({
        success: false,
        message: "Invalid badge value",
      });
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { badge },
      { returnDocument: "after" }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: badge ? `Badge set to ${badge}` : "Badge removed",
      data: { property },
    });

  } catch (error) {
    console.error("Set badge error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to set badge",
    });
  }
};

// DELETE /api/admin/properties/:id
const forceDeleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    // Update seller stats
    const statsUpdate = { $inc: { "stats.totalListings": -1 } };

    if (property.verification.status === "approved") {
      statsUpdate.$inc["stats.activeListings"] = -1;
    } else if (property.verification.status === "pending") {
      statsUpdate.$inc["stats.pendingListings"] = -1;
    }

    await SellerProfile.findOneAndUpdate(
      { userId: property.sellerId },
      statsUpdate
    );

    res.status(200).json({
      success: true,
      message: "Property deleted by admin",
    });

  } catch (error) {
    console.error("Force delete error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
    });
  }
};

// CHANGE ADMIN PASSWORD
// PUT /api/admin/settings/change-password

const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    const admin = await Admin.findById(req.admin.adminId)
      .select("+passwordHash");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change password error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

// GET DASHBOARD STATS
// GET /api/admin/dashboard

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProperties,
      pendingVerifications,
      activeListings,
      recentProperties,
    ] = await Promise.all([
      User.countDocuments({ accountStatus: "active" }),
      Property.countDocuments(),
      Property.countDocuments({ "verification.status": "pending" }),
      Property.countDocuments({ "verification.status": "approved" }),
      Property.find()
        .populate("sellerId", "fullName")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProperties,
          pendingVerifications,
          activeListings,
        },
        recentProperties,
      },
    });

  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

// GET ALL USERS
// GET /api/admin/users

const getAllUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    const filter = {};

    if (role)   filter.roles = role;
    if (status) filter.accountStatus = status;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email:    { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: { users },
    });

  } catch (error) {
    console.error("Get users error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// GET SINGLE USER
// GET /api/admin/users/:id

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const buyerProfile = await BuyerProfile.findOne({ userId: req.params.id });

    const sellerProfile = user.roles.includes("seller")
      ? await SellerProfile.findOne({ userId: req.params.id })
      : null;

    res.status(200).json({
      success: true,
      data: { user, buyerProfile, sellerProfile },
    });

  } catch (error) {
    console.error("Get user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

// BAN USER
// PUT /api/admin/users/:id/ban

const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.accountStatus === "banned") {
      return res.status(400).json({
        success: false,
        message: "User is already banned",
      });
    }

    user.accountStatus = "banned";
    await user.save();

    await Admin.findByIdAndUpdate(req.admin.adminId, {
      $inc: { "activity.usersSuspended": 1 },
    });

    res.status(200).json({
      success: true,
      message: "User banned successfully",
    });

  } catch (error) {
    console.error("Ban user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to ban user",
    });
  }
};

// UNBAN USER
// PUT /api/admin/users/:id/unban

const unbanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.accountStatus === "active") {
      return res.status(400).json({
        success: false,
        message: "User is already active",
      });
    }

    user.accountStatus = "active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User unbanned successfully",
    });

  } catch (error) {
    console.error("Unban user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to unban user",
    });
  }
};

// DELETE USER
// DELETE /api/admin/users/:id

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userId = req.params.id;

    await Promise.all([
      User.findByIdAndDelete(userId),
      BuyerProfile.findOneAndDelete({ userId }),
      SellerProfile.findOneAndDelete({ userId }),
      Property.deleteMany({ sellerId: userId }),
    ]);

    res.status(200).json({
      success: true,
      message: "User and all related data deleted",
    });

  } catch (error) {
    console.error("Delete user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// CHANGE ADMIN PASSWORD
// PUT /api/admin/settings/change-password

const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    const admin = await Admin.findById(req.admin.adminId)
      .select("+passwordHash");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change password error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminMe,
  getAllPropertiesAdmin,
  getPendingProperties,
  verifyProperty,
  setPropertyBadge,
  forceDeleteProperty,
  getDashboardStats,
  getAllUsers,
  getUserById,
  banUser,
  unbanUser,
  deleteUser,
  changeAdminPassword,
};
