/* eslint no-console:0 */
import {compareKeys, compareKeysWithinTextStrings, checkTemplateLenght, checkBirgittaInconsistencies} from '../TestUtil'
import { getTextStrings, languageCodes } from '..'

jest.disableAutomock()

var textStringsTypes = ['server', 'templates']

var textStrings = {}
textStringsTypes.forEach(textStringsType => { textStrings[textStringsType] = {} })
textStringsTypes.forEach(textStringsType => languageCodes.forEach(lang => { textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`) }))

textStringsTypes.forEach(textStringsType => {
  describe(`${textStringsType} TextStrings`, () => {
    languageCodes.forEach(lang => {
      it(`it should return Text Strings for ${textStringsType} ${lang}`, () => {
        expect(textStrings[textStringsType][lang]).not.toEqual(undefined)
      })

      it('all textstrings should have a equivalent string in all other languages', () => {
        languageCodes.forEach(lang2 => compareKeys(textStrings[textStringsType][lang], textStrings[textStringsType][lang2], lang, lang2))
        languageCodes.forEach(lang2 => compareKeysWithinTextStrings(textStrings[textStringsType][lang], textStrings[textStringsType][lang2], lang, lang2))
      })

      it('should not have any birgitta inconsistencies', () => {
        var errorMessages = {}
        languageCodes.forEach((lang2, j) => {
          var errorArray = checkBirgittaInconsistencies(textStrings[textStringsType][lang], textStrings[textStringsType][lang2], lang, lang2)
          errorArray.forEach(key => {
            errorMessages[key] = ''
          })
        })
        if (Object.keys(errorMessages).length > 0) console.warn(JSON.stringify(errorMessages, undefined, 2))
      })

      xit('all task templates should not exceed 15 chars', () => {
        checkTemplateLenght(textStrings[textStringsType][lang], lang)
      })
    })
  })
})
