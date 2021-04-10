const fetch = require("node-fetch");

/** Wakes up Heroku dyno in production */
function wakeUpHerokuDyno() {
  if (process.env.NODE_ENV !== "production") return;
  fetch(process.env.APP_DOMAIN)
    .then((res) => res.text())
    .then(console.log)
    .catch(console.error);
}

module.exports = wakeUpHerokuDyno;
