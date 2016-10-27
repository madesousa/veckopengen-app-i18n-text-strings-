/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var fs = require("fs")
var rootDir = "../"
var dirsToCheck = ["components", "lib", "hocs", "i18n", "config" , "reducers"]
var dirsToCheck = ["components"]
let textStringsSvFilePath = "./text_strings/client/TextStrings_sv.json"
var TextStrings_sv = fs.readFileSync(textStringsSvFilePath, {encoding : "utf8"})
TextStrings_sv = JSON.parse(TextStrings_sv)

//Object.keys(TextStrings).forEach(key => checkIfTextStringIsObsolete(key))

let checkIfTextStringIsObsolete = (key) => {
  dirsToCheck.forEach((dir) => {
    var files = fs.readdirSync(`${rootDir}/dir`)
    files.forEach((file) => {
      console.warn(file)
    })
  })
}

checkIfTextStringIsObsolete("notification_payment_sent_text")
