const axios = require('axios')
const providerName = 'ipdata'
const fs = require('fs');
const { map, get, first, chain, trim } = require('lodash');

const _parseResponse = async data => {
  return {
    country_code: get(data, 'country_code'),
    regions: chain([
      'region',
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
    let { data } = await axios.get(`https://api.ipdata.co/${ip}`, {
      params: {
        "api-key": "638edfc574db7be0c7cf954ff4142c4dbad12473f8bc1d8a01116f98",
      }
    })
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}

module.exports.resolveByGeo = false