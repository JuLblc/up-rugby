const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(process.env.SMTP_URI);

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("error Nodemailer", error);

    return;
  }
  console.log("Server is ready to take our messages");
});

module.exports = transporter;
