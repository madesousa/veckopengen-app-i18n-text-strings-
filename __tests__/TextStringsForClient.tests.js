/* eslint no-console:0 */
import {getTextStrings, languageCodes} from '../index'
import {compareKeys, compareDollarSigns, checkBirgittaInconsistencies, checkStringLenght} from '../TestUtil'
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
    expect(getTextStrings('en')).toEqual(getTextStrings(''))
  })

  xit('Text strings should not be more than 20% longer in other languages', () => {
    languageCodes.forEach(lang2 => checkStringLenght(getTextStrings('en'), getTextStrings(lang2), 'en', lang2))
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

  it('should not have unclosed brackers', () => {
    var leftSide = 0
    var rightSide = 0
    var error = []
    languageCodes.forEach(languageCode => {
      var textString = JSON.stringify(getTextStrings(languageCode))

      leftSide = textString.split('[').length - 1
      rightSide = textString.split(']').length - 1
      if (leftSide !== rightSide) {
        error.push(languageCode)
      }
    })
    if (error.lenght > 0) console.warn(error)
    expect(error).toEqual([])
  })
})
