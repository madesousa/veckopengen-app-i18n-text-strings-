import {getCurrencyConfig} from '../lib/CurrencyConfig'
jest.disableAutomock()

var supportedCurrencies = ['SEK', 'USD', 'AUD', 'CAD', 'GBP', 'INR', 'EUR', 'NZD']

describe('Config', () => {
  it('it should be able to get config ', () => {
    supportedCurrencies.forEach((currencyCode) => expect(getCurrencyConfig(currencyCode)).toBeDefined())
  })

  it('all configs should have same number of keys', () => {
    supportedCurrencies.forEach((x) =>
      supportedCurrencies.forEach(y =>
        Object.keys(getCurrencyConfig(x)).forEach(xKey =>
          Object.keys(getCurrencyConfig(y)).forEach(yKey => expect(getCurrencyConfig(x)[yKey]).not.toEqual(undefined, `Have you configured ${yKey} on currecy ${x}?`))
        )
      )
    )
  })
})
