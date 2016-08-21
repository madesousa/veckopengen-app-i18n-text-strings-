//@flow
import ConfigAUD from "../config/config_AUD"
import ConfigCAD from "../config/config_CAD"
import ConfigEUR from "../config/config_EUR"
import ConfigGBP from "../config/config_GBP"
import ConfigINR from "../config/config_INR"
import ConfigNZD from "../config/config_NZD"
import ConfigSEK from "../config/config_SEK"
import ConfigUSD from "../config/config_USD"

export let getCurrencyConfig = (currencyCode : string) => {
  switch (currencyCode) {
    case "NOK":
    case "DKK":
    case "SEK": return ConfigSEK
    case "GBP": return ConfigGBP
    case "USD": return ConfigUSD
    case "AUD": return ConfigAUD
    case "CAD": return ConfigCAD
    case "NZD": return ConfigNZD
    case "INR": return ConfigINR
    default : return ConfigEUR
  }
}
