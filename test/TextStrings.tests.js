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

	it("all textstrings in sv should have a row in no", () => {
		var se = getTextStrings("sv")
		var keys = Object.keys(se)
		var no = getTextStrings("no")
		keys.forEach(key => {
			var str = no[key]
			if (!str && str !== "")
				console.log("Missing Key: " + key)
			expect(no[key]).to.not.equal(undefined)
		})
	})

})
