const axios = require('axios')
const providerName = 'ipgeolocation'
const fs = require('fs');
const { map, get, first, chain, trim } = require('lodash');

const _parseResponse = async data => {
  return {
    country_code: get(data, 'country_code2'),
    regions: chain([
      'state_prov',
      'district',
      'city',
    ])
      .map(key => {
        return trim(get(data, key, "").replace("County", ""))
      })
      .filter()
      .value(),
  }
}

module.exports.providerName = providerName
module.exports.resolveByIp = async ip => {
  let file = `./cache/result-${providerName}-${ip}.json`
  if (!fs.existsSync(file)) {
    let { data } = await axios.get(`https://api.ipgeolocation.io/ipgeo`, {
      params: {
        "apiKey": "da9f6f07efa34faf83e8765df08fa31e",
        ip,
      }
    })
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}

module.exports.resolveByGeo = false