//@flow
import ConfigAU from "../config/config_AU"
import ConfigCA from "../config/config_CA"
import ConfigEU from "../config/config_EU"
import ConfigGB from "../config/config_GB"
import ConfigIN from "../config/config_IN"
import ConfigNZ from "../config/config_NZ"
import ConfigSE from "../config/config_SE"
import ConfigUS from "../config/config_US"

export let getConfig = (countryCode : string) => {
  switch (countryCode) {
    case "NO":
    case "DK":
    case "SE": return ConfigSE
    case "GB": return ConfigGB
    case "SV":
    case "PA":
    case "EC":
    case "GU":
    case "PW":
    case "PR":
    case "ZW":
    case "US": return ConfigUS
    case "AU": return ConfigAU
    case "CA": return ConfigCA
    case "NZ": return ConfigNZ
    case "IN": return ConfigIN
    default : return ConfigEU
  }
}
