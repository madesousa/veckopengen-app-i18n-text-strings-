var Slack = require('node-slack')
var slack = new Slack('https://hooks.slack.com/services/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')

export var languageCodes = ['da', 'fi', 'is', 'sv', 'nb', 'en', 'fr', 'nl', 'be', 'it', 'es', 'de', 'et', 'is']

var textStringSets = {}
languageCodes.forEach((code) => (textStringSets[code] = require(`../../text_strings/client/${code}.json`)))

export let checkStringLenght = (firstLang: Object, secondLang: Object, firstLangName: string, secondLangName: string):Array<Object> => {
  var keys = Object.keys(firstLang)

  var longTextWarning = []
  var longTextSlackData = []
  keys.forEach(key => {
    if (firstLangName === 'en' && secondLangName !== 'en') {
      if (secondLang[key].includes('PLZ_TRANSLATE')) secondLang[key] = secondLang[key].replace('PLZ_TRANSLATE', '')
      var differencePerc = (firstLang[key].length - secondLang[key].length) / 100

      if (Math.abs(differencePerc) >= 0.20) {
        var actIncr = Math.abs(differencePerc)
        longTextWarning.push(`Lang: ${firstLangName}, Key: ${key} is 20% longer than: ${secondLangName} -> ${actIncr}`)
        longTextSlackData.push({lang: firstLangName, title: key, secLang: secondLangName, value: differencePerc, short: true})
      }
    }
    return true
  })
  // eslint-disable-next-line
  if (longTextWarning.length >0) {console.warn(longTextWarning)}
  return longTextSlackData
}

let runFiora = ():* => {
  var stringLengthData = languageCodes.forEach(lang2 => checkStringLenght(textStringSets.en, textStringSets[lang2], 'en', lang2))

  var attachmentPayload = [{
    'fallback': 'Required text summary of the attachment that is shown by clients that understand attachments but choose not to show them.',
    'text': 'Optional text that should appear within the attachment',
    'pretext': 'Optional text that should appear above the formatted data',
    'color': '#36a64f', // Can either be one of 'good', 'warning', 'danger', or any hex color code
    // Fields are displayed in a table on the message
    'fields': [
      {
        'title': 'Required Field Title', // The title may not contain markup and will be escaped for you
        'value': 'Text value of the field. May contain standard message markup and must be escaped as normal. May be multi-line.',
        'short': false // Optional flag indicating whether the `value` is short enough to be displayed side-by-side with other values
      }
    ]
  }, {
    'fallback': 'String length information',
    'color': '#36a64f',
    'fields': stringLengthData
  }]
  slack.send({
    text: 'Greetings Here is todays info!',
    channel: '#translation_status',
    username: 'TranslationStatus',
    icon_emoji: 'bread',
    attachments: attachmentPayload,
    unfurl_links: true,
    link_names: 1
  })
}
runFiora()
