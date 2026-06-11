const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");
const BuyerProfile = require("../models/BuyerProfile");
const SellerProfile = require("../models/SellerProfile");
const { generateUserToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!["buyer", "seller"].includes(role)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Role must be buyer or seller",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //Set roles
    const roles = role === "seller" ? ["buyer", "seller"] : ["buyer"];

    //Create user document
    const [newUser] = await User.create(
      [{ fullName, email, passwordHash, roles }],
      { session }
    );

    //Create buyer profile
    await BuyerProfile.create(
      [{
        userId: newUser._id,
        savedPropertyIds: [],
        stats: { totalSaved: 0 },
      }],
      { session }
    );

    //Create seller profile only if seller
    if (role === "seller") {
      await SellerProfile.create(
        [{
          userId: newUser._id,
          businessName: null,
          stats: {
            totalListings: 0,
            activeListings: 0,
            pendingListings: 0,
            totalInquiriesReceived: 0,
            sellerRating: 0,
            totalReviews: 0,
          },
        }],
        { session }
      );
    }

    // All good — save everything to DB
    await session.commitTransaction();
    session.endSession();

    console.log("Succeessfully Registered!")

    //Generate JWT
    const token = generateUserToken(newUser._id, newUser.roles);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          roles: newUser.roles,
          avatarUrl: newUser.avatarUrl,
        },
        token,
      },
    });

  } catch (error) {
    // Something failed — undo everything
    //Atomicity 

    if (session.inTransaction()) {
        await session.abortTransaction();
    }

    session.endSession();
    console.error("Register error:", error.message);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

module.exports = { registerUser };