import {getDefaultCurrency, getCurrencies} from "../index"
jest.disableAutomock()

describe("TextStrings", () => {
	it("it should return Currencies",() => {
		expect(getCurrencies()).not.toEqual(undefined)
		expect(getCurrencies().length).toEqual(166)
	})

	it("it should return default currency", () => {
		expect(getDefaultCurrency()).toEqual(43) //EUR
		expect(getDefaultCurrency("SE")).toEqual(121) //SEK
	})
})
