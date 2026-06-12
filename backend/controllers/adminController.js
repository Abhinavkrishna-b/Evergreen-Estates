const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { generateAdminToken } = require("../utils/generateToken");

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


module.exports = { registerAdmin, loginAdmin , getAdminMe };