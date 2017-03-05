/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

// @martin, alright, i would first do this as a seperate project called anna becuase we dont want to screw up sara and this might not work
var fs = require('fs')
var translate = require('@google-cloud/translate')({
  projectId: 'gimi-969a7',
  keyFilename: './utils/gkey/Gimi-b4f63676ca99.json'
})

var AnnaHelper = require('./AnnaHelper')
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates']

let RunAnna = (filePath):* => {
  let getPath = (file) => `${filePath}/${file}`
  var {toHash, fromHash, translationHelpTemplate} = AnnaHelper
  let translateTextStringForFile = (file, textId) => {
    if (file === 'default.json') { return Promise.resolve() }
    if (file.indexOf('.json') === -1) { return Promise.resolve() }

    if (file === 'sv.json') {
      return Promise.resolve()
    }

    var path = getPath(file)
    var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})
    TextStrings = JSON.parse(TextStrings)
    var stringToTranslate = TextStrings[textId]

    if (!stringToTranslate) { return Promise.reject(new Error(`Cant find textid: ${textId} in file: ${path}`)) }
    var lang = file.replace('TextStrings_', '').replace('.json', '')
    if (lang === 'nb') {
      lang = 'no'
    }

    // hash %1$d to num evals to work with google translate
    stringToTranslate = toHash(stringToTranslate)

    return translate.translate(stringToTranslate, lang, (err, translation) => {
      if (err) {
        return console.log(`Error on textId ${textId}. message: ${err}. file: ${file}`)
      }
      var translatedText = fromHash(translation)
      console.log(`Translated text: '${stringToTranslate}' to: '${translatedText}' in ${filePath}/${file}`)
      var re = /\*\*\*(.*?)\*\*\*/g
      if (re.test(translatedText)) {
        TextStrings[textId] = translatedText
      } else {
        TextStrings[textId] = translationHelpTemplate + translatedText
      }

      TextStrings = JSON.stringify(TextStrings, undefined, 2)
      fs.unlinkSync(path)
      return fs.writeFileSync(path, TextStrings, {encoding: 'utf8'})
    })
  }

  let textIdToTranslate = process.argv[2]

  if (!textIdToTranslate) { console.log('use: npm run anna -- <text_id>') }

  if (textIdToTranslate) {
    Promise.all(fs.readdirSync(filePath).map((file) => translateTextStringForFile(file, textIdToTranslate)))
      .then(() => console.log('saved Successfully :)'))
      .catch((err) => console.error(err))
  }
}
templateDir.forEach((filePath) => {
  RunAnna(filePath)
})
