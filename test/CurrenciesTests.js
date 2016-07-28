var expect = require("chai").expect
var getCurrencies = require("../index").getCurrencies


describe("TextStrings", () => {
	it("it should return Currencies",() => {
		expect(getCurrencies()).to.not.equal(undefined)
		expect(getCurrencies().length).to.equal(166)
	})
})
