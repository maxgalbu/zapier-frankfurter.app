const getExchangeRates = (z, bundle) => {
  let requestDate = bundle.inputData.date;
  if (!requestDate) {
    requestDate = "latest";
  }

  if (bundle.inputData.from.indexOf(",") !== -1) {
    bundle.inputData.from = bundle.inputData.from.split(",");
  } else {
    bundle.inputData.from = [bundle.inputData.from];
  }

  const promises = [];
  for (const currency of bundle.inputData.from) {
    const promise = z.request('https://frankfurter.app/' + requestDate + '?base=' + currency)
      .then((response) => {
        let rates = response.json.rates;
        let date = response.json.date;
        if (bundle.inputData.to) {
          return [{
            id: bundle.inputData.to + currency + date,
            from: currency,
            to: bundle.inputData.to,
            rate: rates[bundle.inputData.to],
          }];
        }

        return Object.keys(rates).reduce((array, currency) => {
          array.push({
            id: bundle.inputData.to + currency + date,
            from: currency,
            to: currency,
            rate: rates[currency]
          });
          return array;
        }, []);
      });

    promises.push(promise);
  }

  return Promise.all(promises).then((responses) => {
    let finalArray = [];
    for (const response of responses) {
      finalArray = finalArray.concat(response);
    }

    return finalArray;
  })
};

module.exports = getExchangeRates;
