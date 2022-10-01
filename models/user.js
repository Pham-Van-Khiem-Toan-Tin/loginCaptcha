const mongoose = require("mongoose");
validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const captcha = require("nodejs-captcha");


const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please Enter your name"],
    minLength: [2, "Name should have more than 2 characters"],
    maxLength: [32, "Name can not exceed 32 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  age: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  picture: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "student",
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const newCaptcha = captcha();
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(newCaptcha.value)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  return newCaptcha.image;
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
