
import {getTextStrings, languageCodes} from '../index'
import {stringLenghtStatistic, stringTranslationTags} from '../TestUtil'

var Slack = require('node-slack')

jest.disableAutomock()

describe('TextStrings', () => {
  xit('it should export in slack the length of text_strings', () => {
    var stringLengthData

    languageCodes.forEach(languageCode => {
      stringLengthData = stringLenghtStatistic(getTextStrings('en'), getTextStrings(languageCode), 'en', languageCode)
      var attachmentPayload = [{
        'fallback': 'String lenght data',
        'text': 'Link to git "' + languageCode + '"  <https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/client/' + languageCode + '.json|Click here>',
        'color': stringLengthData.status ? 'warning' : '#36a64f', // Can either be one of 'good', 'warning', 'danger', or any hex color code
        // Fields are displayed in a table on the message
        'fields': stringLengthData.data
      }]
      // https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/client/be.json
      if (stringLengthData.data.length > 1) SendToSlackStats(attachmentPayload, languageCode)
    })
  })

  it('it should show where we have PLZ_TRANSLATE', () => {
    var stringLengthData

    languageCodes.forEach(languageCode => {
      stringLengthData = stringTranslationTags(getTextStrings(languageCode), languageCode)
      var attachmentPayload = [{
        'fallback': 'String containing data',
        'text': 'Link to git "' + languageCode + '"  <https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/client/' + languageCode + '.json|Click here>',
        'color': stringLengthData.status ? 'warning' : '#36a64f', // Can either be one of 'good', 'warning', 'danger', or any hex color code
        // Fields are displayed in a table on the message
        'fields': stringLengthData.data
      }]
      // https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/client/be.json
      if (stringLengthData.data) SendToSlackTagStats(attachmentPayload, languageCode)
    })
  })
})

export let SendToSlackStats = (attachmentPayload: Array<Object>, languageCode: string) => {
  var slack = new Slack('https://hooks.slack.com/services/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')
  slack.send({
    text: 'i18n Language files with languageCode "' + languageCode + '" are more than 25% longer then their English counter parts',
    channel: '#i18n_translation_stat',
    username: 'I18nLangStatistics',
    icon_emoji: ':bread:',
    attachments: attachmentPayload,
    unfurl_links: true,
    link_names: 1
  })
}
export let SendToSlackTagStats = (attachmentPayload: Array<Object>, languageCode: string) => {
  var slack = new Slack('https://hooks.slack.com/services/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')

  slack.send({
    text: 'i18n Language files with languageCode "' + languageCode + '" contain PLZ_TRANSLATE and PLZ_CHECK',
    channel: '#i18n_translation_tags',
    username: 'I18nLangStatistics',
    icon_emoji: ':ramen:',
    attachments: attachmentPayload,
    unfurl_links: true,
    link_names: 1
  })
}
