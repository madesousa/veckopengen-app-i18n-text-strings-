var symbolsThatShouldNotBeReplaced = ['%1$s', '%2$s', '%3$s', '%4$s', '%1$d', '%2$d', '%3$d', '%4$d', '*** Google Translated ***']
var hashPrefix = 8943894903403

let toHash = (text: string) => {
  symbolsThatShouldNotBeReplaced.forEach((symbol, index) => {
    var splits = text.split(symbol)
    text = splits.join(`${hashPrefix}${index}`)
  })

  return text
}

let fromHash = (text: string) => {
  symbolsThatShouldNotBeReplaced.forEach((symbol, index) => {
    var splits = text.split(`${hashPrefix}${index}`)
    text = splits.join(symbol)
  })

  return text
}

let translationHelpTemplate = '*** Google Translated ***'
module.exports = {toHash, fromHash, translationHelpTemplate}
