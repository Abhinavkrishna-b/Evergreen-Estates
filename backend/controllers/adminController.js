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

module.exports = { registerAdmin };