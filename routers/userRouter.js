const express = require("express");

const {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

router.route("/login").post(loginUser);
router.route("password/forgot").post(forgotPassword);
router.route("pasword/reset").post(resetPassword);
router.route("/logout").get(logoutUser);

module.exports = router;