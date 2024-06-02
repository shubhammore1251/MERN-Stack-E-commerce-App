const user = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.header("ecom_tkn");

  if (!token) {
    return next(new ErrorHandler("Unauthorized access Please login!", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await user.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

exports.authorizePublicRoutes = catchAsyncErrors((req, res, next) => {
  const secret = req.header("secret_token");

  if (!secret) {
    return next(new ErrorHandler("Request Not Allowed", 401));
  }

  const authroized = bcrypt.compare(process.env.BROWSER_KEY, secret);

  if (!authroized) {
    return next(new ErrorHandler("Trying to get unauthorized access to this route!", 401));
  }
  
  next();
});
