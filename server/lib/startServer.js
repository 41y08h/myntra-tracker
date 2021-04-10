const http = require("http");
const debug = require("debug")("app");

function startServer() {
  http
    .createServer((req, res) => {
      res.write("Working hard and smart :)");
      res.end();
    })
    .listen(process.env.PORT, () =>
      debug(`⚡ Started on port ${process.env.PORT}`)
    );
}

module.exports = startServer;
