const nodemailer = require("nodemailer");
const {
  clientId,
  clientSecret,
  refreshToken,
  accessToken,
  receiverEmail,
} = require("../config");

const auth = {
  type: "OAuth2",
  user: "piyushsaharsa@gmail.com",
  clientId,
  clientSecret,
  refreshToken,
  accessToken,
};

const transporter = nodemailer.createTransport({ service: "gmail", auth });

module.exports = function sendMail({ subject, text }) {
  return transporter.sendMail({
    from: auth.user,
    to: receiverEmail,
    subject,
    text,
  });
};
