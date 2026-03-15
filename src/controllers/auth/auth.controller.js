const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../../models/user.model");
const { AppError } = require("../../utils/AppError");
const { FilterObj, convertResponseObj } = require("../../utils/UtilFunctions");

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

const register = async (req, res, next) => {

  const allowedFields = ["name", "email", "password", "role"];

  try {

    /*
    -------------------------------------------------
    Filter allowed fields
    -------------------------------------------------
    */

    const filteredObj = FilterObj(allowedFields, req.body);

    const { name, email, password, role } = filteredObj;

    /*
    -------------------------------------------------
    Input Validation
    -------------------------------------------------
    */

    if (!name || !email || !password || !role) {
      throw new AppError("All fields are required", 400);
    }

    if (!validator.isEmail(email)) {
      throw new AppError("Invalid email format", 400);
    }

    if (!validator.isStrongPassword(password)) {
      throw new AppError(
        "Password must be strong (min 8 chars, uppercase, lowercase, number, symbol)",
        400
      );
    }

    const allowedRoles = ["organizer", "customer"];

    if (!allowedRoles.includes(role)) {
      throw new AppError("Invalid role type", 400);
    }

    /*
    -------------------------------------------------
    Check if user already exists
    -------------------------------------------------
    */

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new AppError("User already exists with this email", 409);
    }

    /*
    -------------------------------------------------
    Hash Password
    -------------------------------------------------
    */

    const hashedPassword = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS) || 10
    );

    filteredObj.password = hashedPassword;

    /*
    -------------------------------------------------
    Create User
    -------------------------------------------------
    */

    const user = await UserModel.create(filteredObj);

    /*
    -------------------------------------------------
    Generate JWT
    -------------------------------------------------
    */

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY || "1d" }
    );

    /*
    -------------------------------------------------
    Set Cookie
    -------------------------------------------------
    */

    res.cookie(process.env.COOKIE_NAME || "auth_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    /*
    -------------------------------------------------
    Response
    -------------------------------------------------
    */

    res.status(201).send(
      convertResponseObj(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        true,
        "User registered successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};



/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

const login = async (req, res, next) => {

  const allowedFields = ["email", "password"];

  try {

    /*
    -------------------------------------------------
    Filter allowed fields
    -------------------------------------------------
    */

    const filteredObj = FilterObj(allowedFields, req.body);

    const { email, password } = filteredObj;

    /*
    -------------------------------------------------
    Input Validation
    -------------------------------------------------
    */

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    if (!validator.isEmail(email)) {
      throw new AppError("Invalid email format", 400);
    }

    /*
    -------------------------------------------------
    Find User
    -------------------------------------------------
    */

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    /*
    -------------------------------------------------
    Compare Password
    -------------------------------------------------
    */

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    /*
    -------------------------------------------------
    Generate JWT
    -------------------------------------------------
    */

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY || "1d" }
    );

    /*
    -------------------------------------------------
    Set Cookie
    -------------------------------------------------
    */

    res.cookie(process.env.COOKIE_NAME || "auth_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    /*
    -------------------------------------------------
    Response
    -------------------------------------------------
    */

    res.status(200).send(
      convertResponseObj(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        true,
        "User logged in successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  register,
  login
};