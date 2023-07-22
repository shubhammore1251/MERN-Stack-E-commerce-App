const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const user = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Enter Your First Name"],
  },
  lastname: {
    type: String,
    required: [true, "Please Enter Your Surname"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  profilepic: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

user.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
user.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
user.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Generate Reset Password Token
user.methods.getResetPasswordToken = function () {
  //Generate  Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding reset password token to userschema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 *1000;

  return resetToken;
};

module.exports = mongoose.model("user", user);