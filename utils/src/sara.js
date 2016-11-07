/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var fs = require("fs")
let templateDir = "./text_strings/client"
let getPath = (file) => `${templateDir}/${file}`

var TextStrings_default_path = getPath("TextStrings_default.json")
var TextStrings_default = fs.readFileSync(TextStrings_default_path, {encoding : "utf8"})
TextStrings_default = JSON.parse(TextStrings_default)

var TextStrings_sv_path = getPath("TextStrings_sv.json")
var TextStrings_sv = fs.readFileSync(TextStrings_sv_path, {encoding : "utf8"})
TextStrings_sv = JSON.parse(TextStrings_sv)


let syncTextStrings = (file) => {
  if(file === "TextStrings_default.json")
    return

  if(file === "TextStrings_sv.json")
    return

  var path = getPath(file)

  var TextStrings = fs.readFileSync(path, {encoding : "utf8"})
  TextStrings = JSON.parse(TextStrings)

  //Delete Support
  Object.keys({...TextStrings})
    .filter((key) => TextStrings_sv[key] === undefined)
    .forEach((key) => {
      delete TextStrings[key]
      console.log(`Deleting key: '${key}' from ${file}`)
    })

  //Craete Support
  var NewTextStrings = {...TextStrings_sv, ...TextStrings}
  Object.keys(TextStrings_default).forEach(key => delete NewTextStrings[key])
  var NewTextStringsLength = Object.keys(NewTextStrings).length
  var TextStringsLength = Object.keys(TextStrings).length
  var delta = NewTextStringsLength - TextStringsLength

  if(delta > 0)
    console.log(`Updated ${delta} textstrings in ${file}`)

  //No update support atm :(

  //Save changes
  NewTextStrings = JSON.stringify(NewTextStrings, undefined, 2)
  fs.unlinkSync(path)
  fs.writeFileSync(path, NewTextStrings, {encoding : "utf8"})
}


fs.readdirSync(templateDir).forEach((languageCode) => syncTextStrings(languageCode))

//fix swedish TextStrings formatting
TextStrings_sv = JSON.stringify(TextStrings_sv, undefined, 2)
fs.unlinkSync(TextStrings_sv_path)
fs.writeFileSync(TextStrings_sv_path, TextStrings_sv, {encoding : "utf8"})
