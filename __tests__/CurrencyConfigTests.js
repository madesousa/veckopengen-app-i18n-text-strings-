import {getCurrencyConfig} from "../lib/CurrencyConfig"
jest.disableAutomock()

describe("Config", () => {
	it("it should be able to get config ",() => {
		expect(getCurrencyConfig("SEK")).toBeDefined()
		expect(getCurrencyConfig("USD")).toBeDefined()
		expect(getCurrencyConfig("AUD")).toBeDefined()
		expect(getCurrencyConfig("CAD")).toBeDefined()
		expect(getCurrencyConfig("GBP")).toBeDefined()
		expect(getCurrencyConfig("INR")).toBeDefined()
	})
})
