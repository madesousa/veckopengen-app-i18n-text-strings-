import {getCurrencies} from "../index"
jest.disableAutomock()

describe("TextStrings", () => {
	it("it should return Currencies",() => {
		expect(getCurrencies()).not.toEqual(undefined)
		expect(getCurrencies().length).toEqual(166)
	})
})
