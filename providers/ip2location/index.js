const providerName = 'ip2location'

const axios = require('axios')
const fs = require('fs');
const { map, get, first, chain, toUpper } = require('lodash');

const _parseResponse = async data => {
  return {
    country_code: get(data, 'country_code'),
    regions: chain([
      'city_name',
      'region_name',
      'country_name',
    ])
      .map(key => {
        return get(data, key)
      })
      .filter()
      .value(),
  }
}

module.exports.providerName = providerName
module.exports.resolveByIp = async (ip) => {
  let file = `./cache/result-${providerName}-${ip}.json`
  if (!fs.existsSync(file)) {
    let { data } = await axios.get(`https://api.ip2location.com/v2/`, {
      params: {
        addon: 'continent,country,region,city,geotargeting,country_groupings,time_zone_info',
        key: 'DT5M8YPV1E',
        package: 'WS24',
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