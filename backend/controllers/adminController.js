const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { generateAdminToken } = require("../utils/generateToken");
const Property = require("../models/Property");
const User = require("../models/User");
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

module.exports = { registerAdmin, loginAdmin , getAdminMe, getAllPropertiesAdmin, getPendingProperties, verifyProperty, setPropertyBadge, forceDeleteProperty };