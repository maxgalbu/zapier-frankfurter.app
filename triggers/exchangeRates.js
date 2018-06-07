const getExchangeRates = (z, bundle) => {
  const promise = z.request('https://frankfurter.app/latest?base='+bundle.inputData.from);
  return promise.then((response) => {
    let rates = response.json.rates;
    if (bundle.inputData.to) {
      return [{
        id: bundle.inputData.to,
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

module.exports = {
  key: 'exchangeRates',
  noun: 'Exchange Rates',
  display: {
    label: 'Get Exchange Rates',
    description: 'Get exchange rates'
  },
  operation: {
    perform: getExchangeRates,
    inputFields: [
      {key: 'from', type: 'string', required: true},
      {key: 'to', type: 'string', required: false},
    ],
  }
};
