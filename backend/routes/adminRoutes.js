const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, getAdminMe, getAllPropertiesAdmin, getPendingProperties, verifyProperty, setPropertyBadge, forceDeleteProperty  } = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/register", registerAdmin);
router.post("/login",    loginAdmin);  
router.get("/me",        verifyAdmin, getAdminMe); //A protected route
//GET /api/admin/me

router.get("/properties/pending", verifyAdmin, getPendingProperties);
router.get("/properties", verifyAdmin, getAllPropertiesAdmin);
router.put("/properties/:id/verify", verifyAdmin, verifyProperty);
router.put("/properties/:id/badge", verifyAdmin, setPropertyBadge);
router.delete("/properties/:id", verifyAdmin, forceDeleteProperty);

module.exports = router;