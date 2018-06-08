const getExchangeRates = (z, bundle) => {
  let requestDate = bundle.inputData.date;
  if (!requestDate) {
    requestDate = "latest";
  }
  
  const promise = z.request('https://frankfurter.app/'+requestDate+'?base='+bundle.inputData.from);
  return promise.then((response) => {
    let rates = response.json.rates;
    let date = response.json.date;
    if (bundle.inputData.to) {
      return [{
        id: bundle.inputData.to + date,
        from: bundle.inputData.from,
        to: bundle.inputData.to,
        rate: rates[bundle.inputData.to],
      }];
    }
    
    return Object.keys(rates).reduce((array, currency) => {
      array.push({
        id: currency,
        from: bundle.inputData.from,
        to: currency,
        rate: rates[currency]
      });
      return array;
    }, []);
  });
};

module.exports = getExchangeRates;
