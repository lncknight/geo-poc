const providerName = 'locationiq'

const axios = require('axios')
const fs = require('fs');
const { map, get, first, chain, toUpper } = require('lodash');

var countries = require("i18n-iso-countries");

const _parseResponse = async data => {
  return {
    country_code: toUpper(
      get(data, 'address.country_code')
    ),
    regions: chain([
      'address.region',
      'address.county',
      'address.village',
      'address.road',
      'address.address29',
      'address.hamlet',
      'address.town',
      'address.country',
    ])
      .map(key => {
        return get(data, key)
      })
      .filter()
      .value(),
  }
}

module.exports.providerName = providerName
module.exports.resolveByIp = false

module.exports.resolveByGeo = async ({lat, lng}) => {
  let file = `./cache/result-${providerName}-${lat},${lng}.json`
  if (!fs.existsSync(file)) {
    let { data } = await axios.get(`https://us1.locationiq.com/v1/reverse.php`, {
      params: {
        key: 'pk.d97d86e95ffe6511f4bf3ed72c6be962',
        format: 'json',
        lat,
        lon: lng,
      }
    })
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}