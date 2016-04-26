var expect = require("chai").expect
var getPhoneNumberPrefix = require("../index").getPhoneNumberPrefix
var getCountryCodeFromLocale = require("../index").getCountryCodeFromLocale

describe("TextStrings", () => {
	it("it should return 46 for se", () => {
		expect(getPhoneNumberPrefix("se")).to.equal(46)
	})

	it("it should return 47 for NO", () => {
		expect(getPhoneNumberPrefix("NO")).to.equal(47)
	})

	it("it should return 45 DK", () => {
		expect(getPhoneNumberPrefix("DK")).to.equal(45)
	})

	it("it should return Country Code",() => {
		expect(getCountryCodeFromLocale("sv_SE")).to.equal("SE")
	})
})
