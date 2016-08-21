import {getDefaultCurrencyId, getCurrencies, getCurrency} from "../index"
import DefaultCurrencies from "../DefaultCurrencies"
import ExchangeRates from "../ExchangeRates"

jest.disableAutomock()

describe("TextStrings", () => {
	it("it should return Currencies",() => {
		expect(getCurrencies()).not.toEqual(undefined)
		expect(getCurrencies().length).toEqual(25)
	})

	it("should be able to get currency", () => {
		expect(getCurrency("DKK")).toEqual({
        "model": "api.currency",
        "fields": {
            "model_id": 36,
            "created_at": "2016-01-01T00:00:00",
            "iso_4217_name": "DKK",
            "name": "Danish Krone",
            "enabled": false
        }
    })
	})

	it("it should return default currency", () => {
		expect(getDefaultCurrencyId("FI")).toEqual(43) //EUR
		expect(getDefaultCurrencyId("SE")).toEqual(121) //SEK
		expect(getDefaultCurrencyId("BE")).toEqual(43) //EUR
		expect(getDefaultCurrencyId()).toEqual(43) //EUR
	})

	Object.keys(DefaultCurrencies).forEach(key => {
		it(`Should be an exchange rate for ${key} (entry found in default currencies)`, () => {
				expect(ExchangeRates[DefaultCurrencies[key]]).toBeDefined()
		})
	})
})
