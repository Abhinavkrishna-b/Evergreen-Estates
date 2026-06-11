const jwt = require("jsonwebtoken");

// For users (buyers/sellers)
// Payload contains userId and roles array
// Frontend decodes roles to decide which dashboard to show
const generateUserToken = (userId, roles) => {
  return jwt.sign(
    { userId, roles },
    process.env.USER_JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// For admins — completely separate secret
// Even a valid user token will FAIL admin verification
// because the secrets are different

//But not yet implemented admin signup
const generateAdminToken = (adminId, permissions) => {
  return jwt.sign(
    { adminId, permissions },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

module.exports = { generateUserToken, generateAdminToken };