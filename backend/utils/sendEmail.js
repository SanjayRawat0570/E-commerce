const nodemailer = require("nodemailer");

exports.sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sanjayrawat0570@gmail.com",
      pass: "juue hhbu kmao vsxc", 
    },
  });

  await transporter.sendMail({
    from: "sanjayrawat0570@gmail.com", 
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 10 minutes</p>`,
  });
};

