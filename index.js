const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const http = require("http");

const {
  senderGmail,
  senderGmailPassword,
  scraperApiKey,
  receiverEmail,
  receiverName,
  trackInterval,
} = require("./config");

const products = [
  {
    name: "Green Shirt",
    url: "https://www.myntra.com/13470888?skuId=46078880&sellerPartnerId=4118",
    lastPrice: 1199,
  },
];

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: senderGmail, pass: senderGmailPassword },
});

function notify({ product, currentPrice }) {
  const mail = {
    from: senderGmail,
    to: receiverEmail,
    subject: `>> Myntra Price Fluctuated for ${product.name}`,
    text: `Oh ${receiverName}, Last Price was Rs. ${product.lastPrice} and Current Price is Rs. ${currentPrice}`,
  };
  transporter.sendMail(mail).then((info) => console.log(info.response));
}

setInterval(() => {
  products.forEach((product) => {
    const scraperURL = `http://api.scraperapi.com?api_key=${scraperApiKey}&url=${product.url}`;
    fetch(scraperURL)
      .then((res) => res.text())
      .then((html) => {
        const match1 = html.indexOf('"offers": {');
        const match2 = html.indexOf('"brand" : {');
        const productString = html.slice(match1, match2).trim();
        const latestProduct = JSON.parse(
          productString.slice(10, productString.length - 1)
        );

        const { price: currentPrice } = latestProduct;
        if (parseInt(product.lastPrice) !== parseInt(currentPrice)) {
          // Notify by mail
          notify({ product, currentPrice });
          // Update lastPrice
          product.lastPrice = currentPrice;
        }
      })
      .catch((err) => console.log(err.message));
  });

  // Wake up dyno
  fetch("http://myntra-tracker.herokuapp.com").
       .then(res => res.text())
       .then(console.log)
       .catch((err) => console.log("Failed to wake dyno : ", err.message)) 
}, trackInterval);

const server = http.createServer((req, res) => {
  res.write("Working hard and smart :)");
  res.end();
});

server.listen(process.env.PORT || 5000, () =>
  console.log("Myntra Tracker Application Started")
);
