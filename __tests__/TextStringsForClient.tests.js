import {getTextStrings, languageCodes} from "../index"
jest.disableAutomock()

var compareKeys = (lang1, lang2) => {
	var firstLang = getTextStrings(lang1)
	var keys = Object.keys(firstLang)
	var secondLang = getTextStrings(lang2)
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

describe("TextStrings", () => {
	it("it should return Text Strings", () => {
		languageCodes.forEach(lang => expect(getTextStrings(lang)).not.toEqual(undefined, "Cant find TextStrings for: " + lang))
	})

	it("all textstrings should have a equivalent string in all other languages", () => {
		languageCodes.forEach(lang1 => languageCodes.forEach(lang2 => compareKeys(lang1, lang2)))
	})

	it("all languages should have a default textStrings", () => {
		languageCodes.forEach(lang => compareKeys("default", lang))
	})
})
