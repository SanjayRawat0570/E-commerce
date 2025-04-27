const nodemailer = require("nodemailer");
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
    return true;
  } catch (error) {
 
    return false;
  }
};


