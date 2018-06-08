const getExchangeRates = require('./getExchangeRates');
const moment = require("moment");

const triggerExchangeRates = (z, bundle) => {
  let date = moment();
  if (date.hours() > bundle.inputData.hour) {
    bundle.inputData.date = moment("yesterday").format("YYYY-MM-DD");
  }
  
  return getExchangeRates(z, bundle);
};

module.exports = triggerExchangeRates;
