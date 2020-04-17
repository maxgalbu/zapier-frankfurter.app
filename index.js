const triggerExchangeRates = require('./src/triggerExchangeRates');
const triggerMultipleExchangeRates = require('./src/triggerMultipleExchangeRates');
const getExchangeRates = require('./src/getExchangeRates');

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    'triggerExchangeRates': {
      key: 'triggerExchangeRates',
      noun: 'Exchange Rate',
      display: {
        label: 'Trigger with Exchange Rates',
        description: 'Trigger that returns exchange rates'
      },
      operation: {
        perform: triggerExchangeRates,
        inputFields: [
          {key: 'hour', choices: {
            '10am': '10 AM',
            '11am': '11 AM',
            '12am': '12 AM'}, required: true},
          {key: 'from', type: 'string', required: true},
          {key: 'to', type: 'string', required: false},
        ],
      }
    },
    'triggerMultipleExchangeRates': {
      key: 'triggerMultipleExchangeRates',
      noun: 'Exchange Rate (multiple currencies)',
      display: {
        label: 'Trigger with Exchange Rates (multiple currencies)',
        description: 'Trigger that returns exchange rates from multiple currencies'
      },
      operation: {
        perform: triggerMultipleExchangeRates,
        inputFields: [
          {key: 'hour', choices: {
              '10am': '10 AM',
              '11am': '11 AM',
              '12am': '12 AM'}, required: true},
          {key: 'from', type: 'string', required: true},
          {key: 'to', type: 'string', required: false},
        ],
      }
    },
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    'exchangeRates': {
      key: 'exchangeRates',
      noun: 'Exchange Rates',
      display: {
        label: 'Get Exchange Rates',
        description: 'Obtain exchange rates from frankfurter.app'
      },
      operation: {
        perform: getExchangeRates,
        inputFields: [
          {key: 'from', type: 'string', required: true},
          {key: 'to', type: 'string', required: false},
        ],
      }
    }
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    
  }
};

// Finally, export the app.
module.exports = App;
