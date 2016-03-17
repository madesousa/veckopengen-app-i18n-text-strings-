var expect = require("chai").expect
var getTextStrings = require("../index")

describe("TextStrings", () => {
	it("it should return sv", () => {
		expect(getTextStrings("sv")).to.not.equal(undefined)
	})

	it("it should return en", () => {
		expect(getTextStrings("en")).to.not.equal(undefined)
	})

	it("it should return nb", () => {
		expect(getTextStrings("nb")).to.not.equal(undefined)
	})

	it("it should return nn", () => {
		expect(getTextStrings("nn")).to.not.equal(undefined)
	})

	it("all textstrings in sv should have a row in en", () => {
		var se = getTextStrings("sv")
		var keys = Object.keys(se)
		var en = getTextStrings("en")
		keys.forEach(key => {
			var str = en[key]
			if (!str && str !== "")
				console.log("Missing Key: " + key)
			expect(en[key]).to.not.equal(undefined)
		})
	})

	it("all textstrings in sv should have a row in nb", () => {
		var se = getTextStrings("sv")
		var keys = Object.keys(se)
		var no = getTextStrings("nb")
		keys.forEach(key => {
			var str = no[key]
			if (!str && str !== "")
				console.log("Missing Key: " + key)
			expect(no[key]).to.not.equal(undefined)
		})
	})

})
