const nodemailer = require("nodemailer");
const debug = require("debug")("app:mailer");

function sendMail(recipients, { subject, body }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });

  const mail = {
    from: process.env.GMAIL,
    to: recipients,
    html: body,
    subject,
  };

  return transporter
    .sendMail(mail)
    .then(() => debug(`Email successfully sent to ${recipients}`));
}

module.exports = sendMail;
