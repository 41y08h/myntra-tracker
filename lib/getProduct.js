const { spawn } = require("child_process");

function getProduct(productUrl) {
  return new Promise((resolve) => {
    const scriptProcess = spawn("python", ["./getProductData.py", productUrl]);
    let product;

    // Assings data in fragments
    scriptProcess.stdout.on("data", (data) => (product = data.toString()));

    // Finally resolve with processed data
    scriptProcess.on("close", () => resolve(JSON.parse(product)));
  });
}

module.exports = getProduct;
