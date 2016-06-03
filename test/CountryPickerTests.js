var expect = require("chai").expect
var getCountries = require("../index").getCountries


describe("TextStrings", () => {
	it("it should return Country Code",() => {
		expect(getCountries()).to.not.equal(undefined)
	})
})
