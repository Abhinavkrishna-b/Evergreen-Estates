const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");

// Only sign up for now
router.post("/register", registerUser);

module.exports = router;