/* eslint no-console:0 */
import {getTextStrings, languageCodes} from '../index'
import {compareKeys, compareDollarSigns, checkBirgittaInconsistencies} from '../TestUtil'
jest.disableAutomock()

describe('TextStrings', () => {
  it('it should return Text Strings', () => {
    languageCodes.forEach(lang => expect(getTextStrings(lang)).not.toEqual(undefined, 'Cant find TextStrings for: ' + lang))
  })

  it('all textstrings should have a equivalent string in all other languages', () => {
    languageCodes.forEach(lang1 => languageCodes.forEach(lang2 => compareKeys(getTextStrings(lang1), getTextStrings(lang2), lang1, lang2)))
  })

  it('all textstrings should have right amount of $d and $c and $s signs signs', () => {
    languageCodes.forEach(lang1 => languageCodes.forEach(lang2 => compareDollarSigns(getTextStrings(lang1), getTextStrings(lang2), lang1, lang2, '$')))
    languageCodes.forEach(lang1 => languageCodes.forEach(lang2 => compareDollarSigns(getTextStrings(lang1), getTextStrings(lang2), lang1, lang2, '$d')))
    languageCodes.forEach(lang1 => languageCodes.forEach(lang2 => compareDollarSigns(getTextStrings(lang1), getTextStrings(lang2), lang1, lang2, '$s')))
  })

  it('all languages should have english as default', () => {
    expect(getTextStrings('en')).toEqual(getTextStrings('default'))
  })

  it('should not have any birgitta inconsistencies', () => {
    var errorMessages = {}
    languageCodes.forEach((lang1, i) =>
      languageCodes.forEach((lang2, j) => {
        var errorArray = checkBirgittaInconsistencies(getTextStrings(lang1), getTextStrings(lang2), lang1, lang2)
        errorArray.forEach(key => {
          errorMessages[key] = ''
        })
      }))
    console.warn(JSON.stringify(errorMessages, undefined, 2))
  })
})
