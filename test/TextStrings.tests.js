var expect = require("chai").expect
var getTextStrings = require("../index")

describe("TextStrings", () => {
	it("it should return sv", () => {
		expect(getTextStrings("sv")).to.not.equal(undefined)
	})

	it("it should return en", () => {
		expect(getTextStrings("en")).to.not.equal(undefined)
	})

	it("it should return no", () => {
		expect(getTextStrings("no")).to.not.equal(undefined)
	})
})
