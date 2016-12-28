import {supportedLanguageCodes} from '../index'
jest.disableAutomock()

let getMomentLocale = (languageCode) => {
  switch (languageCode) {
    case 'sv' : return 'sv'
    case 'da' : return 'da'
    case 'fi' : return 'fi'
    case 'nb' : return 'nb'
    case 'en' :
    default : return 'en'
  }
}

describe('MomentLocale', () => {
  // The test below may look a bit stupid but it will fail when we add a new supported language code without importing a new momentum locale, plz keep, Anders 2016-09-18
  it('it should return something else than en for every supported language code', () => {
    var enLocale = getMomentLocale('en')
    var supportedLanguageCodesTest = supportedLanguageCodes.filter((lang) => lang !== 'en')
    supportedLanguageCodesTest.forEach((lang) => {
      expect(getMomentLocale(lang)).not.toEqual(enLocale)
    })
  })
})
