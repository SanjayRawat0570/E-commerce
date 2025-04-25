const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const {
    signup, verifyOTP, sendOTPReset, resetPassword, login
} = require("../controllers/authController");

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/send-otp", auth.reset);
router.post("/verify-otp", auth.verifyOTP);
router.post("/reset-password", auth.resetPassword);

module.exports = router;
