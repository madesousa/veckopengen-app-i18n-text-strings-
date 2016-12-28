// @flow
import da from './text_strings/client/da.json'
import fi from './text_strings/client/fi.json'
import is from './text_strings/client/is.json'
import sv from './text_strings/client/sv.json'
import no from './text_strings/client/nb.json'
import en from './text_strings/client/en.json'
import _default from './text_strings/client/default.json'
import svLocale from 'moment/locale/sv'
import daLocale from 'moment/locale/da'
import fiLocale from 'moment/locale/fi'
import nbLocale from 'moment/locale/nb'
import enLocale from 'moment/locale/en-gb'
import CountryCodes from './CountryCodes.json'
import Regions from './Regions.json'
import Cities from './Cities.json'
import Currencies from './Currencies.json'
import Timezones from './TimeZones.json'
import LanguageCodes from './LanguageCodes.json'
import countryCodes2PhoneNumberPrefixes from './countryCodes2PhoneNumberPrefixes.json'
import DefaultCurrencies from './DefaultCurrencies'
export var supportedLanguageCodes = ['da', 'fi', 'sv', 'nb', 'en']
export var languageCodes = ['da', 'fi', 'is', 'sv', 'nb', 'en', 'fr', 'nl']
var supportedCurrencies = Object.values(DefaultCurrencies)

export let getTextStrings = (lang: string) => {
  switch (lang.substring(0, 2)) {
    case 'da' : return {..._default, ...da}
    case 'fi' : return {..._default, ...fi}
    case 'is' : return {..._default, ...is}
    case 'nb' : return {..._default, ...no}
    case 'nn' : return {..._default, ...no}
    case 'sv' : return {..._default, ...sv}
    default : return {..._default, ...en}
  }
}

export let getRegions = () => { return Regions }
export let getCities = () => { return Cities }

export let getMomentLocale = (locale: string) => {
  if (locale === undefined) {
    return enLocale
  }

  let lang = locale.substring(0, 2)
  switch (lang) {
    case 'sv':
      return svLocale
    case 'da':
      return daLocale
    case 'fi':
      return fiLocale
    case 'nb':
      return nbLocale
    case 'en':
      return enLocale
    default: return enLocale
  }
}

export let getCountries = () => CountryCodes
export let getCountry = (countryCode: string) => CountryCodes.find(country => country.code === countryCode)
export let getPhoneNumberPrefix = (countryCode: string) => parseInt(countryCodes2PhoneNumberPrefixes[countryCode.toUpperCase()])
export let getCountryCodeFromLocale = (locale: string) => locale.slice(-2)
export let getCurrencies = () => Currencies.filter(currency => supportedCurrencies.indexOf(currency.fields.iso_4217_name) !== -1)
export let getTimezones = () => Timezones
export let getCurrency = (currencyCode: string) => getCurrencies().find(currency => currency.fields.iso_4217_name === currencyCode)
export let getLangugageCodes = () => LanguageCodes.filter(languageCode => supportedLanguageCodes.indexOf(languageCode.code) !== -1)

export let getConfig

export let getDefaultCurrency = (userCountryCode: string) => {
  var currency = getCurrency(DefaultCurrencies[userCountryCode])

  if (currency) {
    return currency.fields
  }

  return getCurrency('EUR').fields
}

export let getDefaultCurrencyId = (userCountryCode: string) => {
  return getDefaultCurrency(userCountryCode).model_id
}
