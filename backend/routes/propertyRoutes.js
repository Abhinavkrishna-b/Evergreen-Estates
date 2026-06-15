const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyById,
  getMyProperties,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");
const verifyToken = require("../middleware/verifyToken");
const verifyRole  = require("../middleware/verifyRole");

//Public route
router.get("/",    getProperties);
router.get("/my-properties", verifyToken, verifyRole("seller"), getMyProperties);
router.get("/:id", getPropertyById);

//Protected Route
router.post("/",   verifyToken, verifyRole("seller"), createProperty);
router.put("/:id",           verifyToken, verifyRole("seller"), updateProperty);
router.delete("/:id",        verifyToken, verifyRole("seller"), deleteProperty);

module.exports = router;
