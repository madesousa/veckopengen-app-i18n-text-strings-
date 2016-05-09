var expect = require("chai").expect
var getTextStrings = require("../index").getTextStrings
var langs = ["da","fi","is","sv","nb","nn"]


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

var getTextStrings

describe("TextStrings", () => {
	it("it should return Text Strings", () => {
		langs.forEach(lang => expect(getTextStrings(lang)).to.not.equal(undefined, "Cant find TextStrings for: " + lang))
	})

	it("all textstrings should have a equivalent string in all other languages", () => {
		langs.forEach(lang1 => langs.forEach(lang2 => compareKeys(lang1, lang2)))
	})
})
