var expect = require("chai").expect
var getPhoneNumberPrefix = require("../index").getPhoneNumberPrefix

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

})
