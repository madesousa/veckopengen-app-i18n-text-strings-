// @flow
import IgnoredTextStrings from './IgnoredTextStrings.json'
import {supportedLanguageCodes} from './index.js'
import defaultTextStrings from './text_strings/client/default.json'

var ignoredKeys = ['currency', 'currencyMinus', 'currencyPlus', 'aint_no_money_desc', 'no_money_pig_parent_text']

export let compareKeys = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '') => {
  var keys = Object.keys(firstLang)
  var errorMessages = []
  keys.forEach(key => {
    if (secondLang[key] === undefined || secondLang[key] === '') {
      errorMessages.push(`Lang: '${secondLangName}', Missing key: '${key}'`)
    }

    if (secondLang[key].indexOf('$ ') !== -1) {
      errorMessages.push(`Lang: '${firstLangName}', Key: '${key}' has a $ and whitespace, do you mean $s, $d or $c ?`)
    }

    if (secondLang[key] === firstLang[key] &&
      firstLangName !== 'sv' &&
      secondLangName === 'sv' &&
      !IgnoredTextStrings.includes(key) &&
      !defaultTextStrings[key] &&
      supportedLanguageCodes.includes(firstLangName)) {
      errorMessages.push(`Lang: '${firstLangName}', Key: '${key}' is equal to: '${secondLangName}'`)
    }
  })

  expect(errorMessages).toEqual([])
}

export let compareDollarSigns = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '', template: string = '$') => {
  var keys = Object.keys(firstLang)
  var errorMessages = []
  keys.forEach(key => {
    if (!ignoredKeys.includes(key) && firstLang[key].split(template).length !== secondLang[key].split(template).length) {
      errorMessages.push(`Lang: '${secondLangName}', Key: '${key}' has not the same amount of ${template} signs as text string in ${firstLangName} lang, plz check`)
    }
  })

  expect(errorMessages).toEqual([])
}

let testCompareKeysWithinTextString = (textString1: string, textString2: string, textStringName: string) => {
  var keys1 = textString1.match(/\{(.*?)\}/g) || []
  var keys2 = textString2.match(/\{(.*?)\}/g) || []

  var errorMessages = keys1.map(key1 => {
    if (key1.indexOf(' ') !== -1) {
      return undefined
    }

    if (!keys2.includes(key1)) {
      return `About Texttring: ${textStringName}. Cant find {${key1}} in: '${textString2}, {${key1}} key was found in: '${textString1}'`
    }
    return undefined
  })

  var errorMessage = errorMessages.find((errorMessage) => errorMessage !== undefined)

  return errorMessage
}

export let compareKeysWithinTextStrings = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '') => {
  var keys = Object.keys(firstLang)
  keys.forEach(key => {
    var errorMessage
    errorMessage = testCompareKeysWithinTextString(firstLang[key], secondLang[key], key)
    expect(errorMessage).toEqual(undefined)
  })
}
export let checkTemplateLenght = (langs: Object, langName: string = '') => {
  var keys = Object.keys(langs)
  var patternTemplates = 'template_title'
  var errorMessages = []
  keys.forEach(key => {
    if (key.includes(patternTemplates) && !IgnoredTextStrings.includes(key)) {
      if (langs[key].length > 15) {
        errorMessages.push(`Lang: '${langName}', String: '${langs[key]}' exeeds 15 characters '${langs[key].length}'`)
      }
    }
  })
  expect(errorMessages).toEqual([])
}
