const path = require("path");
const { spawn } = require("child_process");

function getProduct(productUrl) {
  const scriptPath = path.join(__dirname, "fetchProduct.py");

  return new Promise((resolve) => {
    spawn("python", [scriptPath, productUrl]).stdout.on("data", (data) =>
      resolve(JSON.parse(data.toString()))
    );
  });
}

module.exports = getProduct;
