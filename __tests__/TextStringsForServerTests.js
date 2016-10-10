import {languageCodes} from "../index"
jest.disableAutomock()

var textStringsTypes = ["notifications", "templates"]

var textStrings = {}
textStringsTypes.forEach(textStringsType => textStrings[textStringsType] = {})
textStringsTypes.forEach(textStringsType => languageCodes.forEach(lang => textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`)))


var compareKeys = (lang1, lang2, textStringsType) => {
	var firstLang = textStrings[textStringsType][lang1]
	var keys = Object.keys(firstLang)
	var secondLang = textStrings[textStringsType][lang2]
	keys.forEach(key => {
		var errorMessage

		if(secondLang[key] === undefined || secondLang[key] === "")
			errorMessage = `Lang: '${lang2}', Missing key: '${key}'`

		expect(errorMessage).toEqual(undefined)

		if(secondLang[key].indexOf("$ ") !== -1)
			errorMessage = `Lang: '${lang2}', Key: '${key}' has a $ and whitespace, do you mean $s, $d or $c ?`
		expect(errorMessage).toEqual(undefined)
	})
}

textStringsTypes.forEach(textStringsType => {
	describe(`${textStringsType} TextStrings`, () => {

		languageCodes.forEach(lang => {
			it(`it should return Text Strings for ${textStringsType} ${lang}`, () => {
				expect(textStrings[textStringsType][lang]).not.toEqual(undefined)
			})

			it("all textstrings should have a equivalent string in all other languages", () => {
				languageCodes.forEach(lang2 => compareKeys(lang, lang2, textStringsType))
			})
		})
	})
})
