const axios = require('axios')
const providerName = 'geocode.xyz'
const fs = require('fs');
const { map, get, first, chain } = require('lodash');

const _parseResponse = async data => {
  return {
    country_code: get(data, 'prov'),
    regions: chain([
      'osmtags.name',
      'osmtags.name_zh',
      'adminareas.admin6.name',
      'adminareas.admin6.name_zh',
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
    let { data } = await axios.get(`https://geocode.xyz/${ip}?json=1`)
    fs.writeFileSync(file, JSON.stringify(data))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}

module.exports.resolveByGeo = async ({lat, lng}) => {
  let file = `./cache/result-${providerName}-${lat},${lng}.json`
  if (!fs.existsSync(file)) {
    let { data } = await axios.get(`https://geocode.xyz/${lat},${lng}?json=1`)
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}