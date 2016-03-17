var TextStrings_sv = require("./text_strings/TextStrings_sv.json") 
var TextStrings_no = require("./text_strings/TextStrings_no.json") 
var TextStrings_en = require("./text_strings/TextStrings_en.json")

module.exports = lang => {
	if (lang.indexOf("sv") !== -1)
		return TextStrings_sv

	if (lang.indexOf("en") !== -1)
		return TextStrings_en

	if (lang.indexOf("no") !== -1)
		return TextStrings_no

	return undefined
}
