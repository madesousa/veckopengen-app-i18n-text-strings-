jest.disableAutomock()

describe('TextStrings', () => {
  ['da', 'fi', 'sv', 'nb', 'en', 'nl', 'fr'].forEach(lang => {
    it(`it should have valid JSON for client/${lang}`, () => {
      require(`../text_strings/client/${lang}`)
    })

    it(`it should have valid JSON for server/${lang}`, () => {
      require(`../text_strings/server/${lang}`)
    })

    it(`it should have valid JSON for templates/${lang}`, () => {
      require(`../text_strings/templates/${lang}`)
    })
  })
})
