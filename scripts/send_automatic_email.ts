// If no email are sent for a long time, sendgrid desactivate the account
// This function will be call with a cron every XX

import transporter from "../utils/mailer";

export const sendAutomaticEmail = async () => {
  const response = await transporter.sendMail({
    from: process.env.EMAIL_ADRESS,
    html: "Automatic Email to keep uprugby sendgrid account alive!",
    subject: "Uprugby sendgrid",
    to: process.env.EMAIL_ADRESS,
  });

  return response;
};
