/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

//@martin, alright, i would first do this as a seperate project called anna becuase we dont want to screw up sara and this might not work
var fs = require("fs")
var translate = require("google-translate-api")

let templateDir = "./text_strings/client"
let getPath = (file) => `${templateDir}/${file}`



let translateTextStringForFile = (file, textId) => {

  //@martin see sara code below as inspiration, this file loops over all files in the directory ./text_strings/client/
  //on line 24, 25 the file gets read and parsed to a js object.
  //In this function i would translate the text_string with the help of google transalte and save the file,
  //the file is saved on line 49 and 50

  //a note about this environment, it is a node 6 env. Node 6 differs from react native, for example import does not work, use require,
  // node 6 api docs you can find online.

  //one case you need to handle is the strings with "$1%s", perhaps the google lib wont translate it


  if(file === "default.json")
    return Promise.resolve()

  if(file === "sv.json")
    return Promise.resolve()

  var path = getPath(file)

  var TextStrings = fs.readFileSync(path, {encoding : "utf8"})
  TextStrings = JSON.parse(TextStrings)
  var stringToReplace = TextStrings[textId]
  var lang = file.replace("TextStrings_","").replace(".json","")
  if(lang === "nb")
    lang = "no"

  return translate(stringToReplace, {to: lang}).then(res => {
      console.log(`Translated text: '${stringToReplace}' to: '${res.text}' in ${file}`)
      TextStrings[textId] = res.text
      TextStrings = JSON.stringify(TextStrings, undefined, 2)
      fs.unlinkSync(path)
      fs.writeFileSync(path, TextStrings, {encoding : "utf8"})
    }).catch(err => {
      return Promise.reject(new Error(`Error on textId${textId}. message:${err}. file: ${file}`))
  })
  //replace gamla med nya
  //sen spara till fil

  //Save changes

}

let textIdToTranslate = process.argv[2]

//@martin parse process.argv which contains the inputs you executed the app with, for example, npm run anna -- text_id,
//then the value of textid will be in the process.argv array at place 3 or 4
Promise.all(fs.readdirSync(templateDir).map((file) => translateTextStringForFile(file, textIdToTranslate)))
.then(() => console.log("saved Successfully :)"))
.catch((err)=> console.error(err))
