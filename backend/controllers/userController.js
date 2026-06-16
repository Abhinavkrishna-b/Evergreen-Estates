const User = require("../models/User");
const BuyerProfile = require("../models/BuyerProfile");
const SellerProfile = require("../models/SellerProfile");
const Property = require("../models/Property");

// GET MY PROFILE
// GET /api/users/profile

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });

  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// UPDATE MY PROFILE
// PUT /api/users/profile

const updateMyProfile = async (req, res) => {
  try {
    const { fullName, phone, avatarUrl } = req.body;
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phone)    updateData.phone    = phone;
    if (avatarUrl) updateData.avatarUrl = avatarUrl;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { returnDocument: "after", runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user },
    });

  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// SAVE PROPERTY
// POST /api/users/saved/:propertyId

const saveProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.verification.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Cannot save an unapproved property",
      });
    }

    const buyerProfile = await BuyerProfile.findOne({
      userId: req.user.userId,
    });

    if (!buyerProfile) {
      return res.status(404).json({
        success: false,
        message: "Buyer profile not found",
      });
    }

    const alreadySaved = buyerProfile.savedPropertyIds
      .map((id) => id.toString())
      .includes(propertyId);

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Property already saved",
      });
    }

    await BuyerProfile.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: { savedPropertyIds: propertyId },
        $inc: { "stats.totalSaved": 1 },
      }
    );

    await Property.findByIdAndUpdate(propertyId, {
      $inc: { "stats.saves": 1 },
    });

    res.status(200).json({
      success: true,
      message: "Property saved successfully",
    });

  } catch (error) {
    console.error("Save property error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to save property",
    });
  }
};

// UNSAVE PROPERTY
// DELETE /api/users/saved/:propertyId

const unsaveProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const buyerProfile = await BuyerProfile.findOne({
      userId: req.user.userId,
    });

    if (!buyerProfile) {
      return res.status(404).json({
        success: false,
        message: "Buyer profile not found",
      });
    }

    const isSaved = buyerProfile.savedPropertyIds
      .map((id) => id.toString())
      .includes(propertyId);

    if (!isSaved) {
      return res.status(400).json({
        success: false,
        message: "Property not in saved list",
      });
    }

    await BuyerProfile.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $pull: { savedPropertyIds: propertyId },
        $inc: { "stats.totalSaved": -1 },
      }
    );

    await Property.findByIdAndUpdate(propertyId, {
      $inc: { "stats.saves": -1 },
    });

    res.status(200).json({
      success: true,
      message: "Property removed from saved list",
    });

  } catch (error) {
    console.error("Unsave property error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to unsave property",
    });
  }
};

// GET SAVED PROPERTIES
// GET /api/users/saved

const getSavedProperties = async (req, res) => {
  try {
    const buyerProfile = await BuyerProfile.findOne({
      userId: req.user.userId,
    });

    if (!buyerProfile) {
      return res.status(404).json({
        success: false,
        message: "Buyer profile not found",
      });
    }

    const savedProperties = await Property.find({
      _id: { $in: buyerProfile.savedPropertyIds },
      "verification.status": "approved",
    }).populate("sellerId", "fullName avatarUrl phone");

    res.status(200).json({
      success: true,
      count: savedProperties.length,
      data: { savedProperties },
    });

  } catch (error) {
    console.error("Get saved error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch saved properties",
    });
  }
};

// GET SELLER PROFILE
// GET /api/users/seller-profile

const getSellerProfile = async (req, res) => {
  try {
    const sellerProfile = await SellerProfile.findOne({
      userId: req.user.userId,
    });

    if (!sellerProfile) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { sellerProfile },
    });

  } catch (error) {
    console.error("Get seller profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller profile",
    });
  }
};

// UPDATE SELLER PROFILE
// PUT /api/users/seller-profile

const updateSellerProfile = async (req, res) => {
  try {
    const { businessName } = req.body;

    if (!businessName) {
      return res.status(400).json({
        success: false,
        message: "Business name is required",
      });
    }

    const sellerProfile = await SellerProfile.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: { businessName } },
      { returnDocument: "after" }
    );

    if (!sellerProfile) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seller profile updated",
      data: { sellerProfile },
    });

  } catch (error) {
    console.error("Update seller profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update seller profile",
    });
  }
};

module.exports = {
  getMyProfile, updateMyProfile, saveProperty, unsaveProperty, getSavedProperties, getSellerProfile, updateSellerProfile,
};
