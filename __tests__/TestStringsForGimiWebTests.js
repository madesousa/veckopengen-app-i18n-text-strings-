/* eslint no-console:0 */
import {compareKeys, compareKeysWithinTextStrings} from '../TestUtil'
var langCodes = ['da', 'en', 'fi', 'fr', 'nl', 'no', 'sv']
jest.disableAutomock()

var textStringsTypes = ['gimi-web']

var textStrings = {}
textStringsTypes.forEach(textStringsType => { textStrings[textStringsType] = {} })
textStringsTypes.forEach(textStringsType => {
  langCodes.forEach(lang => { textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`) })
})
textStringsTypes.forEach(textStringsType => {
  describe(`${textStringsType} TextStrings`, () => {
    langCodes.forEach(lang => {
      it('all textstrings should have a equivalent string in all other languages', () => {
        langCodes.forEach(lang2 => compareKeys(textStrings[textStringsType][lang], textStrings[textStringsType][lang2], lang, lang2))
        langCodes.forEach(lang2 => compareKeysWithinTextStrings(textStrings[textStringsType][lang], textStrings[textStringsType][lang2], lang, lang2))
      })
    })
  })
})
