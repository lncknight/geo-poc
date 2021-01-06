const axios = require('axios')
const providerName = 'ipstack.com'
const fs = require('fs');
const { map, get, first, chain } = require('lodash');

var countries = require("i18n-iso-countries");

const _parseResponse = async data => {
  return {
    country_code: get(data, 'country_code'),
    regions: chain([
      'region_name',
      'city',
      'region_code',
    ])
      .map(key => {
        return get(data, key)
      })
      .filter()
      .value(),
  }
}

module.exports.providerName = providerName
module.exports.resolveByIp = async ip => {
  let file = `./cache/result-${providerName}-${ip}.json`
  if (!fs.existsSync(file)) {
    let { data } = await axios.get(`http://api.ipstack.com/${ip}`, {
      params: {
        access_key: '0157efb6671772febd9e677c632d8ce9',
      }
    })
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}

module.exports.resolveByGeo = false // not available