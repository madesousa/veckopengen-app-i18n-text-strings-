import {getSupportedCurrencyCodes, getDefaultCurrencyCode} from '../index'
import DefaultCurrencies from '../DefaultCurrencies'
import ExchangeRates from '../ExchangeRates'

jest.disableAutomock()

describe('Currencies', () => {
  it('it should return supported supportedCurrencyCodes', () => {
    expect(getSupportedCurrencyCodes()).not.toEqual(undefined)
    expect(getSupportedCurrencyCodes().length).toEqual(28)
    expect(getSupportedCurrencyCodes()).toMatchSnapshot()
  })

  it('it should return default currency', () => {
    expect(getDefaultCurrencyCode('FI')).toEqual('EUR')
    expect(getDefaultCurrencyCode('NO')).toEqual('NOK')
    expect(getDefaultCurrencyCode('GB')).toEqual('GBP')
    expect(getDefaultCurrencyCode('SE')).toEqual('SEK')
    expect(getDefaultCurrencyCode('BE')).toEqual('EUR')
    expect(getDefaultCurrencyCode()).toEqual('EUR')
  })

  Object.keys(DefaultCurrencies).forEach(key => {
    it(`Should be an exchange rate for ${key} (entry found in default currencies)`, () => {
      expect(ExchangeRates[DefaultCurrencies[key]]).toBeDefined()
    })
  })
})
