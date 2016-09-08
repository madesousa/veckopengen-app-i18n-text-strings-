//@flow
import TextStrings_da from "./text_strings/TextStrings_da.json"
import TextStrings_fi from "./text_strings/TextStrings_fi.json"
import TextStrings_is from "./text_strings/TextStrings_is.json"
import TextStrings_sv from "./text_strings/TextStrings_sv.json"
import TextStrings_no from "./text_strings/TextStrings_nb.json"
import TextStrings_en from "./text_strings/TextStrings_en.json"
import TextStrings_default from "./text_strings/TextStrings_default.json"

import CountryCodes from "./CountryCodes.json"
import Currencies from "./Currencies.json"
import LanguageCodes from "./LanguageCodes.json"
import countryCodes2PhoneNumberPrefixes from "./countryCodes2PhoneNumberPrefixes.json"
import DefaultCurrencies from "./DefaultCurrencies"
var supportedLanguageCodes = ["da","fi","sv","nb","en"] //"nn"
var supportedCurrencies = Object.values(DefaultCurrencies)

export let getTextStrings = (lang : string) => {
	switch (lang.substring(0, 2)) {
		case "da" : return {...TextStrings_default, ...TextStrings_da}
		case "fi" : return {...TextStrings_default, ...TextStrings_fi}
		case "is" : return {...TextStrings_default, ...TextStrings_is}
		case "nb" : return {...TextStrings_default, ...TextStrings_no}
		case "nn" : return {...TextStrings_default, ...TextStrings_no}
		case "sv" : return {...TextStrings_default, ...TextStrings_sv}
		case "default" : return TextStrings_default //used in tests
		default : return {...TextStrings_default, ...TextStrings_en}


	}
}

export let getCountries = () => CountryCodes
export let getCountry = (countryCode : string) => CountryCodes.find(country => country.code === countryCode)
export let getPhoneNumberPrefix = (countryCode : string) => parseInt(countryCodes2PhoneNumberPrefixes[countryCode.toUpperCase()])
export let getCountryCodeFromLocale = (locale : string) => locale.slice(-2)
export let getCurrencies = () => Currencies.filter(currency => supportedCurrencies.indexOf(currency.fields.iso_4217_name) !== -1)
export let getCurrency = (currencyCode : string) => getCurrencies().find(currency => currency.fields.iso_4217_name === currencyCode)
export let getLangugageCodes = () => LanguageCodes.filter(languageCode => supportedLanguageCodes.indexOf(languageCode.code) !== -1)

export let getConfig

export let getDefaultCurrency = (userCountryCode : string) => {
	var currency = getCurrency(DefaultCurrencies[userCountryCode])

	if (currency)
		return currency.fields
	return getCurrency("EUR").fields
}

export let getDefaultCurrencyId = (userCountryCode : string) => {
	return getDefaultCurrency(userCountryCode).model_id
}
