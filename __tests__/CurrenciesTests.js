import {getDefaultCurrency, getCurrencies, getCurrency} from "../index"
jest.disableAutomock()

describe("TextStrings", () => {
	it("it should return Currencies",() => {
		expect(getCurrencies()).not.toEqual(undefined)
		expect(getCurrencies().length).toEqual(6)
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
		expect(getDefaultCurrency()).toEqual(43) //EUR
		expect(getDefaultCurrency("SE")).toEqual(121) //SEK
	})
})
