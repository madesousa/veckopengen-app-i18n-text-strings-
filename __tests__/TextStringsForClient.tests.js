import {getTextStrings, languageCodes} from '../index'
import {compareKeys, compareDollarSigns} from '../TestUtil'
jest.disableAutomock()

describe('TextStrings', () => {
  it('it should return Text Strings', () => {
    languageCodes.forEach(lang => expect(getTextStrings(lang)).not.toEqual(undefined, 'Cant find TextStrings for: ' + lang))
  })

  it('all textstrings should have a equivalent string in all other languages', () => {
    languageCodes.forEach(lang1 => languageCodes.forEach(lang2 => compareKeys(getTextStrings(lang1), getTextStrings(lang2), lang1, lang2)))
  })

  it('all textstrings should have right amount of dollar signs', () => {
    languageCodes.forEach(lang1 => languageCodes.forEach(lang2 => compareDollarSigns(getTextStrings(lang1), getTextStrings(lang2), lang1, lang2)))
  })

  it('all languages should have english as default', () => {
    expect(getTextStrings('en')).toEqual(getTextStrings('default'))
  })
})
