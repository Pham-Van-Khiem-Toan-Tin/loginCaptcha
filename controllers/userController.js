
const userModel = require("../models/user");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandle = require("../utils/errorHandle");
const studentModel = require("../models/student");

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { id, password } = req.body;
  //checking if user have name and password
  if (!userName || !password) {
    return next(new ErrorHandle("Please Enter Your Email and Password", 400));
  }
  const user = await userModel.findOne({ id: id }).select("+password");
  if (!user) {
    return next(new ErrorHandle("Invalid eamil or password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandle("Invalid eamil or password", 401));
  }
  if (user.role === "student") {
    const student = await studentModel
      .findOne({ id: user._id })
      .populate("users", "name email age dateOfBirth");
    sendToken(student, 200, res);
  }
  sendToken(user, 200, res);
});

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ id: req.body.id });
  if (!user) {
    return next(new ErrorHandle("User not found", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  //send email
  try {
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandle(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.captcha)
    .digest("hex");
  const user = await userModel.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandle(
        "Reset passsword token is invalid or has been  expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandle("Password does not match confirm password"));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  sendToken(user, 200, res);
});
