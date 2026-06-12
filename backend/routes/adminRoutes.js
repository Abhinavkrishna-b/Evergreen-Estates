const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, getAdminMe  } = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/register", registerAdmin);
router.post("/login",    loginAdmin);  
router.get("/me",        verifyAdmin, getAdminMe); //A protected route
//GET /api/admin/me

module.exports = router;