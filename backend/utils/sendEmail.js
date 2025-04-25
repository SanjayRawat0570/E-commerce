// sendOTP.js
const nodemailer = require("nodemailer");

// Function to send OTP to the user's email
exports.sendOTP = async (email, otp) => {
  try {
    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sanjayrawat0570@gmail.com", // your Gmail
        pass: "juue hhbu kmao vsxc",       // app password (not your Gmail password)
      },
    });

    // Email content
    const mailOptions = {
      from: "sanjayrawat0570@gmail.com",
      to: email, // ✅ dynamic recipient
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: <b>${otp}</b></h2><p>This OTP is valid for 10 minutes.</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ OTP sent to:", email);
    console.log("📨 Message ID:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    return false;
  }
};


