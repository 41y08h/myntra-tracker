module.exports = {
  senderGmail: process.env.SENDER_GMAIL,
  scraperApiKey: process.env.SCRAPER_API_KEY,
  receiverEmail: process.env.RECEIVER_EMAIL,
  receiverName: process.env.RECEIVER_NAME,
  trackInterval: 1000 * 60 * 10,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
};
