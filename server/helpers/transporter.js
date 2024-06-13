const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

module.exports = { transporter };
