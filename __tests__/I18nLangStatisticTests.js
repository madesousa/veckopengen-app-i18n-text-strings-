
import {getTextStrings, languageCodes} from '../index'
import {stringLenghtStatistic, stringTranslationTags} from '../TestUtil'

var Slack = require('node-slack')

jest.disableAutomock()

var displayStructureObject:Object = {
  lang: 'string',
  count: 0,
  link: 'string',
  file: ''
}
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
    var stringTagData = []
    var jsonDataCheck = []
    var jsonDataTranslate = []

    languageCodes.forEach(languageCode => {
      stringTagData.push(stringTranslationTags(getTextStrings(languageCode), languageCode))
    })
    var textStringsTypes = ['server', 'templates']

    var textStrings = {}
    textStringsTypes.forEach(textStringsType => { textStrings[textStringsType] = {} })
    textStringsTypes.forEach(textStringsType => {
      languageCodes.forEach(lang => { textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`) })
    })
    textStringsTypes.forEach(textStringsType => {
      languageCodes.forEach(lang => {
        languageCodes.forEach(languageCode => {
          stringTagData.push(stringTranslationTags(getTextStrings(languageCode), languageCode, textStringsType))
        })
      })
    })
    stringTagData.forEach(data => {
      if (data.plzCheck > 0) {
        var path = data.path ? data.path : 'client'
        jsonDataCheck.push({lang: data.lang, path: path, count: data.plzCheck, link: '<https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/' + path + '/' + data.lang + '.json|Click here>'})
      }
    })
    stringTagData.forEach(data => {
      if (data.plzTrans > 0) {
        var path = data.path ? data.path : 'client'
        jsonDataTranslate.push({lang: data.lang, path: path, count: data.plzTrans, link: '<https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/' + path + '/' + data.lang + '.json|Click here>'})
      }
    })
    var attachmentPayload = {
      typeCheck: 'PLZ_CHECK',
      langFilesContCheck: jsonDataCheck,
      typeTrans: 'PLZ_TRANSLATE',
      langFilesContTranslate: jsonDataTranslate

    }
    SendToSlackTagStats(attachmentPayload)
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
    text: 'i18n Client Language files ' + JSON.stringify(attachmentPayload, undefined, 2),
    channel: '#i18n_translation_tags',
    username: 'I18nLangStatistics',
    icon_emoji: ':ramen:',
    attachments: [],
    unfurl_links: true,
    link_names: 1
  })
}
