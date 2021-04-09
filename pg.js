const cron = require("node-cron");
const getProduct = require("./lib/getProduct");

cron.schedule("*/5 * * * * *", async () => {
  const productUrl =
    "https://www.myntra.com/13470888?skuId=46078880&sellerPartnerId=4118";
  const product = await getProduct(productUrl);
  console.log(product.offers.price);
});
