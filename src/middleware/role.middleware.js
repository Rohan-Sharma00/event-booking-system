const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. Insufficient permissions"
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { roleMiddleware };