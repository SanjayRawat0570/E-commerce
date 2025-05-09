const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");
const { sendOTP } = require("../utils/sendEmail");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;
    const user = await User.create({
      name,
      email,
      password: hashed,
      otp,
      otpExpires,
      isVerified: false,
    });
    await sendOTP(email, otp);
    res.status(201).json({ msg: "Signup successful. OTP sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during signup" });
  }
};
exports.verifyOTP = async (req, res) => {
  try {
    const {email, otp } = req.body; 
    const user = await User.findOne({ email });
    if (!user || String(user.otp) !== String(otp) || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ msg: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during OTP verification" });
  }
};
// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!user.isVerified) {
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000;
      await user.save();
      await sendOTP(email, otp);
      return res.status(403).json({ error: "Email not verified. OTP resent." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user });

  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || String(user.otp) !== String(otp) || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error resetting password" });
  }
};
exports.reset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOTP(email, otp);
    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during password reset" });
  }
};
exports.sendOTP = async (email, otp) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sanjayrawat0570@gmail.com", 
        pass: "juue hhbu kmao vsxc",       
      },
    });
    const mailOptions = {
      from: "sanjayrawat0570@gmail.com",
      to: email, 
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: <b>${otp}</b></h2><p>This OTP is valid for 10 minutes.</p>`,
    };
    const info = await transporter.sendMail(mailOptions);

    console.log("OTP sent to:", email);
    console.log(" Message ID:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    return false;
  }
};


