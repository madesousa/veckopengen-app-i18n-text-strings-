var expect = require("chai").expect
var getTextStrings = require("../index")

var compareKeys = (lang1, lang2) => {
	var firstLang = getTextStrings(lang1)
	var keys = Object.keys(firstLang)
	var secondLang = getTextStrings(lang2)
	keys.forEach(key => {
		var errorMessage = `Lang: '${lang2}', Missing key: '${key}'`
		expect(secondLang[key]).to.not.equal(undefined,  errorMessage)
		expect(secondLang[key]).to.not.equal("", errorMessage )
	})
}

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

	it("all textstrings should have a equivalent string in all other languages", () => {
			compareKeys("sv", "en")
			compareKeys("sv", "nb")
			compareKeys("en", "sv")
			compareKeys("en", "nb")
			compareKeys("nb", "sv")
			compareKeys("nb", "en")
	})
})
