import {getMomentLocale, supportedLanguageCodes} from "../index"
jest.disableAutomock()

describe("TextStrings", () => {
	it("it should return en as default momentLocale",() => {
		var enLocale = getMomentLocale("en")
		var supportedLanguageCodesTest = supportedLanguageCodes.filter((lang)=>lang !== "en")
		supportedLanguageCodesTest.forEach((lang)=>{
				expect(getMomentLocale(lang)).not.toEqual({})
		})
	})

		it("it should return sv as momentLocale",() => {
			var svLocale = getMomentLocale("sv")
			console.warn(svLocale)
			expect(getMomentLocale("sv")).toEqual(svLocale)
		})
})
