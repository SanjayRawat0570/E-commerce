const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanjayrawat0570@gmail.com',
    pass: 'juue hhbu kmao vsxc' 
  }
});

const mailOptions = {
  from: 'sanjayrawat0570@gmail.com',
  to: 'sanjayrawat5764@gmail.com', 
  subject: 'Simple Email from Node.js',
  text: 'Hello! This is a simple text email using Nodemailer.'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) return console.error('Failed to send email:', err);
  console.log('Email sent successfully:', info.response);
});

