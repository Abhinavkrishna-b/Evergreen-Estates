const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  updateMyProfile,
  saveProperty,
  unsaveProperty,
  getSavedProperties,
  getSellerProfile,
  updateSellerProfile,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyRole  = require("../middleware/verifyRole");

// PROFILE 
router.get("/profile",  verifyToken, getMyProfile);
router.put("/profile",  verifyToken, updateMyProfile);

// SAVED PROPERTIES 
router.get("/saved",              verifyToken, getSavedProperties);
router.post("/saved/:propertyId", verifyToken, saveProperty);
router.delete("/saved/:propertyId", verifyToken, unsaveProperty);

//SELLER PROFILE
router.get("/seller-profile", verifyToken, verifyRole("seller"), getSellerProfile);
router.put("/seller-profile", verifyToken, verifyRole("seller"), updateSellerProfile);

module.exports = router;

