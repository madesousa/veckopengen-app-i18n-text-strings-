var TextStrings_sv = require("./text_strings/TextStrings_sv") 
var TextStrings_no = require("./text_strings/TextStrings_no") 
var TextStrings_en = require("./text_strings/TextStrings_en") 

module.exports = lang => {
	if (lang === "sv")
		return TextStrings_sv

	if (lang === "en")
		return TextStrings_en

	if (lang === "no")
		return TextStrings_no

	return undefined
}
