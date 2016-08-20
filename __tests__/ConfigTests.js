import {getConfig} from "../lib/Config"
jest.disableAutomock()

describe("Config", () => {
	it("it should be able to get config ",() => {
		expect(getConfig("SE")).toBeDefined()
		expect(getConfig("US")).toBeDefined()
		expect(getConfig("FR")).toBeDefined()
		expect(getConfig("FI")).toBeDefined()
		expect(getConfig("SE")).toBeDefined()
		expect(getConfig("AU")).toBeDefined()
		expect(getConfig("CA")).toBeDefined()
		expect(getConfig("GB")).toBeDefined()
		expect(getConfig("IN")).toBeDefined()

		expect(getConfig("SE")).toEqual(getConfig("NO"))
		expect(getConfig("SE")).toEqual(getConfig("DK"))
	})
})
