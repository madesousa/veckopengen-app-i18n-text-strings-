import {getCountries} from "../index"
jest.disableAutomock()

describe("TextStrings", () => {
	it("it should return Country Code",() => {
		expect(getCountries()).not.toEqual(undefined)
	})
})
