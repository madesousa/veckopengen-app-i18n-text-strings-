/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

//@martin, alright, i would first do this as a seperate project called anna becuase we dont want to screw up sara and this might not work
var fs = require("fs")
var googleTranslate = require("google-translate")("apiKey")

let templateDir = "./text_strings/client"
let getPath = (file) => `${templateDir}/${file}`

var TextStrings_default_path = getPath("TextStrings_default.json")
var TextStrings_default = fs.readFileSync(TextStrings_default_path, {encoding : "utf8"})
TextStrings_default = JSON.parse(TextStrings_default)

var TextStrings_sv_path = getPath("TextStrings_sv.json")
var TextStrings_sv = fs.readFileSync(TextStrings_sv_path, {encoding : "utf8"})
TextStrings_sv = JSON.parse(TextStrings_sv)


let translateTextStringForFile = (file, textId) => {

  //@martin see sara code below as inspiration, this file loops over all files in the directory ./text_strings/client/
  //on line 24, 25 the file gets read and parsed to a js object.
  //In this function i would translate the text_string with the help of google transalte and save the file,
  //the file is saved on line 49 and 50

  //a note about this environment, it is a node 6 env. Node 6 differs from react native, for example import does not work, use require,
  // node 6 api docs you can find online.

  //one case you need to handle is the strings with "$1%s", perhaps the google lib wont translate it


  if(file === "TextStrings_default.json")
    return

  if(file === "TextStrings_sv.json")
    return

  if(file !== "TextStrings_da.json")
    return


  var path = getPath(file)

  var TextStrings = fs.readFileSync(path, {encoding : "utf8"})
  TextStrings = JSON.parse(TextStrings)
  var stringToReplace = TextStrings[textId]
  //var translatedString = googleTranslate.translate(stringToReplace)
  //plocka ut textid och trnaslatea de till rätt lang
  //replace gamla med nya
  //sen spara till fil
return


  //Save changes
  //TextStrings = JSON.stringify(TextStrings, undefined, 2)
  fs.unlinkSync(path)
  fs.writeFileSync(path, TextStrings, {encoding : "utf8"})
}

let textIdToTranslate = process.argv[2]


//@martin parse process.argv which contains the inputs you executed the app with, for example, npm run anna -- text_id,
//then the value of textid will be in the process.argv array at place 3 or 4
fs.readdirSync(templateDir).forEach((file) => translateTextStringForFile(file, textIdToTranslate))
