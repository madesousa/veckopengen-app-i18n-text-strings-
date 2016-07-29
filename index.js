import TextStrings_da from "./text_strings/TextStrings_da.json"
import TextStrings_fi from "./text_strings/TextStrings_fi.json"
import TextStrings_is from "./text_strings/TextStrings_is.json"
import TextStrings_sv from "./text_strings/TextStrings_sv.json"
import TextStrings_no from "./text_strings/TextStrings_no.json"
import TextStrings_en from "./text_strings/TextStrings_en.json"
import CountryCodes from "./CountryCodes.json"
import Currencies from "./Currencies.json"
import countryCodes2PhoneNumberPrefixes from "./countryCodes2PhoneNumberPrefixes.json"

export let getTextStrings = lang => {
	switch (lang.substring(0, 2)) {
		case "da" : return TextStrings_da
		case "fi" : return TextStrings_fi
		case "is" : return TextStrings_is
		case "sv" : return TextStrings_sv
		case "nb" : return TextStrings_no
		case "nn" : return TextStrings_no
		case "en" : return TextStrings_en
		default : 	return TextStrings_sv
	}
}

export let getCountries = (countries) => {
	return CountryCodes
}

export let getPhoneNumberPrefix = countryCode => parseInt(countryCodes2PhoneNumberPrefixes[countryCode.toUpperCase()])
export let getCountryCodeFromLocale = locale => locale.slice(-2)
export let getCurrencies = () => Currencies

export let getDefaultCurrency = (userCountryCode) => {
  switch (userCountryCode) {
    case "SE" : return 121 //SEK
    case "NOK" : return 101 //NOK
    case "DK" : return 36 //NOK
    case "GB" : return 46 //GBP
		case "US" : return 142 //USD
    default : return 43 //EUR
  }
}
