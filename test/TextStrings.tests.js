var expect = require("chai").expect
var getTextStrings = require("../TextStrings")

describe("TextStrings", () => {
	it("it should return correct lang", () => {
		expect(getTextStrings("sv")).to.not.equal(undefined)
	})
})
