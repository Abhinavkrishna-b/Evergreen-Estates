const verifyRole = (role) => {
  return (req, res, next) => {
    // req.user.roles comes from verifyToken
    if (!req.user.roles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only ${role}s can perform this action.`,
      });
    }
    next();
  };
};

module.exports = verifyRole;
