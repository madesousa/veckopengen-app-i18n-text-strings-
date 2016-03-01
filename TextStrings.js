var TextStrings_sv = require("./TextStrings_sv") 

module.exports = lang => {
	if (lang === "sv")
		return TextStrings_sv

	if (lang === "en")
		return TextStrings_sv

	return undefined
}
