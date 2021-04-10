const cron = require("node-cron");
const getProduct = require("./lib/getProduct");
const sendMail = require("./lib/sendMail");
const wakeUpHerokuDyno = require("./lib/wakeUpHerokuDyno");
const debug = require("debug")("app");
const startServer = require("./lib/startServer");

// Track Product
(async () => {
  const url =
    "https://www.myntra.com/13470888?skuId=46078880&sellerPartnerId=4118";

  const product = await getProduct(url);
  const history = [product];

  const envNotProduction = process.env.NODE_ENV !== "production";

  cron.schedule(process.env.CRON_TIME, async () => {
    const latestProduct = await getProduct(url);

    const latestPrice = parseInt(latestProduct.offers.price);
    const oldPrice = parseInt(history[history.length - 1].offers.price);

    const priceFluctuated = latestPrice !== oldPrice;
    const mockFluctuation = envNotProduction && Math.random() < 0.5;

    if (priceFluctuated || mockFluctuation) {
      const message = `Price fluctuated >> id: ${latestProduct.sku} >> old price: ${oldPrice} >> new price: ${latestPrice}`;
      debug(message);

      sendMail(process.env.RECEIVER, {
        subject: ">> [Tracker] Myntra Price fluctuated",
        body: `Myntra ka chamatkar, new price is ${latestProduct.offers.price}`,
      });
    }

    history.push(latestProduct);
  });
})();

// Wake up dyno every 14 minutes in production
if (process.env.NODE_ENV === "production")
  cron.schedule("* */14 * * * *", wakeUpHerokuDyno);

startServer();
