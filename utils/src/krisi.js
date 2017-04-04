/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

var fs = require('fs')
var translate = require('@google-cloud/translate')({
  projectId: 'gimi-969a7',
  keyFilename: './utils/gkey/Gimi-b4f63676ca99.json'
})

var AnnaHelper = require('./AnnaHelper')
let templateDir = ['./text_strings/client']

let RunPolina = (filePath):* => {
  let getPath = (languageFile) => `${filePath}/${languageCode}`
  var {toHash, fromHash, translationHelpTemplate} = AnnaHelper
  let translateLanguageFile = (languageFile) => {
    if (languageFile.indexOf('.json') === -1) { return void 0 }

    var path = getPath(languageFile)
    var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})
    // TextStrings = JSON.parse(TextStrings)

    var textStringArray = TextStrings.split(':')
    for (var i = 0; i < TextStrings.length; i++) {
      console.log(textStringArray[0])
      var textId = textStringArray[0]
      var stringToTranslate = textStringArray[0]

      if (!stringToTranslate) {
        console.warn(`Cant find: ${languageCode} in file: ${path}`)
        return void 0
      }
      var lang = languageFile.replace('TextStrings_', '').replace('.json', '')
      // hash %1$d to num evals to work with google translate
      stringToTranslate = toHash(stringToTranslate)
      i++

      translate.translate(stringToTranslate, lang, (err, translation) => {
        if (err) {
          return console.log(`Error on textId ${textId}. message: ${err}. file: ${languageFile}`)
        }
        var translatedText = fromHash(translation)
        console.log(`Translated text: '${stringToTranslate}' to: '${translatedText}' in ${filePath}/${languageFile}`)
        var re = /PLZ_TRANSLATE/g
        if (re.test(translatedText)) {
          TextStrings[textId] = translatedText
        } else {
          TextStrings[textId] = `${translationHelpTemplate} ${translatedText}`
        }

        TextStrings = JSON.stringify(TextStrings, undefined, 2)
        fs.unlinkSync(path)
        return fs.writeFileSync(path, TextStrings, {encoding: 'utf8'})
      })
    }

    return void 0
  }

  let languageCode = process.argv[2]

  if (!languageCode) { console.log('use: npm run poli -- <languageCode>') }

  if (languageCode) {
    translateLanguageFile(languageCode)
  }
}
templateDir.forEach((filePath) => {
  RunPolina(filePath)
})
