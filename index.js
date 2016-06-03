var TextStrings_da = require("./text_strings/TextStrings_da.json")
var TextStrings_fi = require("./text_strings/TextStrings_fi.json")
var TextStrings_is = require("./text_strings/TextStrings_is.json")
var TextStrings_sv = require("./text_strings/TextStrings_sv.json")
var TextStrings_no = require("./text_strings/TextStrings_no.json")
var TextStrings_en = require("./text_strings/TextStrings_en.json")
var CountryCodes = require('./CountryCodes.json') //Lägg i globals

var countryCodes2PhoneNumberPrefixes = require("./countryCodes2PhoneNumberPrefixes.json")

var getTextStrings = lang => {
	switch(lang.substring(0, 2)) {
		case "da" : return TextStrings_da
		case "fi" : return TextStrings_fi
		case "is" : return TextStrings_is
		case "sv" : return TextStrings_sv
		case "nb" : return TextStrings_no
		case "nn" : return TextStrings_no
		default : 	return TextStrings_sv
	}
}

var getCountries = (countries) => {
	return CountryCodes
}

var getPhoneNumberPrefix = countryCode => parseInt(countryCodes2PhoneNumberPrefixes[countryCode.toUpperCase()])
var getCountryCodeFromLocale = locale => locale.slice(-2)

module.exports.getTextStrings = getTextStrings
module.exports.getPhoneNumberPrefix = getPhoneNumberPrefix
module.exports.getCountryCodeFromLocale = getCountryCodeFromLocale
module.exports.getCountries = getCountries
