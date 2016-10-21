export let compareKeys = (firstLang, secondLang, firstLangName = "", secondLangName = "") => {
	var keys = Object.keys(firstLang)
	keys.forEach(key => {
		var errorMessage

		if(secondLang[key] === undefined || secondLang[key] === "")
			errorMessage = `Lang: '${secondLangName}', Missing key: '${key}'`

		expect(errorMessage).toEqual(undefined)

		if(secondLang[key].indexOf("$ ") !== -1)
			errorMessage = `Lang: '${firstLangName}', Key: '${key}' has a $ and whitespace, do you mean $s, $d or $c ?`
		expect(errorMessage).toEqual(undefined)
	})
}

let testCompareKeysWithinTextString = (textString1, textString2, textStringName) => {

  //if(textString1 !== "Ny månad och {amount} {currency} av din förra månadspeng har autosparats!")
  //  return undefined

  var keys1 = textString1.match(/\{(.*?)\}/g) || []
  var keys2 = textString2.match(/\{(.*?)\}/g) || []

  //console.log("keys1", keys1)
  //console.log("keys2", keys2)

  var errorMessages = keys1.map(key1 => {

    if(key1.indexOf(" ") !== -1)
      return undefined

    if(!keys2.includes(key1))
      return `About Texttring: ${textStringName}. Cant find {${key1}} in: '${textString2}, {${key1}} key was found in: '${textString1}'`
  })

  var errorMessage = errorMessages.find((errorMessage) => errorMessage !== undefined)

  return errorMessage
}

export let compareKeysWithinTextStrings = (firstLang, secondLang, firstLangName = "", secondLangName = "") => {
	var keys = Object.keys(firstLang)
	keys.forEach(key => {
		var errorMessage

    var errorMessage = testCompareKeysWithinTextString(firstLang[key], secondLang[key], key)
    //console.log(errorMessage)
		expect(errorMessage).toEqual(undefined)

		if(secondLang[key].indexOf("$ ") !== -1)
			errorMessage = `Lang: '${firstLangName}', Key: '${key}' has a $ and whitespace, do you mean $s, $d or $c ?`
		expect(errorMessage).toEqual(undefined)
	})
}
