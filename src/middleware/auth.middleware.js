const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { AppError } = require("../utils/AppError");

const UserAuth = async (req, res, next) => {
  try {

    const cookieName = process.env.COOKIE_NAME || "auth_token";

    const token = req.cookies?.[cookieName];

    if (!token) {
      return next(new AppError("Authentication token missing", 401));
    }

    /*
    |--------------------------------------------------------------------------
    | Verify JWT
    |--------------------------------------------------------------------------
    */

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { userId } = decoded;

    /*
    |--------------------------------------------------------------------------
    | Check user exists
    |--------------------------------------------------------------------------
    */

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    /*
    |--------------------------------------------------------------------------
    | Attach user to request
    |--------------------------------------------------------------------------
    */

    req.user = user;

    next();

  } catch (error) {

    return next(new AppError("Authentication failed", 401));

  }
};

module.exports = { UserAuth };