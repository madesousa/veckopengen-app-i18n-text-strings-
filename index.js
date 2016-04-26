var TextStrings_sv = require("./text_strings/TextStrings_sv.json")
var TextStrings_no = require("./text_strings/TextStrings_no.json")
var TextStrings_en = require("./text_strings/TextStrings_en.json")
var countryCodes2PhoneNumberPrefixes = require("./countryCodes2PhoneNumberPrefixes.json")

var getTextStrings = lang => {
	lang = lang.substring(0, 2)
	if (lang.indexOf("sv") !== -1)
		return TextStrings_sv

	if (lang.indexOf("en") !== -1)
		return TextStrings_en

	if (lang.indexOf("nb") !== -1 || lang.indexOf("nn") !== -1)
		return TextStrings_no

	return TextStrings_en
}

var getPhoneNumberPrefix = countryCode => parseInt(countryCodes2PhoneNumberPrefixes[countryCode.toUpperCase()])
var getCountryCodeFromLocale = locale => locale.slice(-2)

module.exports.getTextStrings = getTextStrings
module.exports.getPhoneNumberPrefix = getPhoneNumberPrefix
module.exports.getCountryCodeFromLocale = getCountryCodeFromLocale
