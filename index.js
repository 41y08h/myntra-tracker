const fetch = require("node-fetch");
const http = require("http");

const { scraperApiKey, receiverName, trackInterval } = require("./config");
const sendMail = require("./lib/sendMail");

const products = [
  {
    name: "Green Shirt",
    url: "https://www.myntra.com/13470888?skuId=46078880&sellerPartnerId=4118",
    lastPrice: 1199,
  },
];

function notify({ product, currentPrice }) {
  sendMail({
    subject: `>> Myntra Price Fluctuated for ${product.name}`,
    text: `Oh ${receiverName}, Last Price was Rs. ${product.lastPrice} and Current Price is Rs. ${currentPrice}`,
  }).then((info) => console.log(info.response));
}

function track() {
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

  // Wake up dyno in production
  if (process.env.NODE_ENV === "production")
    fetch("http://myntra-tracker.herokuapp.com")
      .then((res) => res.text())
      .then(console.log)
      .catch((err) => console.log("Failed to wake dyno : ", err.message));
}

track();
setInterval(track, trackInterval);

const server = http.createServer((req, res) => {
  res.write("Working hard and smart :)");
  res.end();
});

server.listen(process.env.PORT || 5000, () =>
  console.log("Myntra Tracker Application Started")
);
