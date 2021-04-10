const path = require("path");
const { spawn } = require("child_process");

function getProduct(productUrl) {
  const scriptPath = path.join(__dirname, "fetchProduct.py");

  return new Promise((resolve) => {
    spawn("python", [scriptPath, productUrl]).stdout.on("data", (data) => {
      const product = JSON.parse(data.toString());
      product.timestamp = Date.now();
      resolve(product);
    });
  });
}

module.exports = getProduct;
