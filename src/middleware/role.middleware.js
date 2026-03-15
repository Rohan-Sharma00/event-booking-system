const { AppError } = require("../utils/AppError");

const RoleAccess = (...allowedRoles) => {

  return (req, res, next) => {

    try {

      if (!req.user) {
        return next(new AppError("Unauthorized access", 401));
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return next(new AppError("Forbidden: insufficient permissions", 403));
      }

      next();

    } catch (error) {

      next(error);

    }

  };

};

module.exports = { RoleAccess };