// @Flow
var Slack = require('node-slack')
var slack = new Slack('https://hooks.slack.com/services/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')

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
}]
slack.send({
  text: 'Howdy!',
  channel: '#translation_status',
  username: 'TranslationStatus',
  icon_emoji: 'bread',
  attachments: attachmentPayload,
  unfurl_links: true,
  link_names: 1
})
