module.exports = {
  senderGmail: process.env.SENDER_GMAIL,
  senderGmailPassword: process.env.SENDER_GMAIL_PASSWORD,
  scraperApiKey: process.env.SCRAPER_API_KEY,
  receiverEmail: process.env.RECEIVER_EMAIL,
  receiverName: process.env.RECEIVER_NAME,
  trackInterval: 1000 * 60 * 10,
};
