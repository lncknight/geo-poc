const axios = require('axios')
const providerName = 'positionstack'
const fs = require('fs');
const { map, get, first, chain } = require('lodash');

var countries = require("i18n-iso-countries");

const _parseResponse = async data => {
  let country_code = countries.alpha3ToAlpha2(get(data, 'data.0.country_code'))
  return {
    country_code,
    regions: chain([
      'data.0.name',
      'data.0.region',
      'data.0.region_code',
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
    let { data } = await axios.get(`http://api.positionstack.com/v1/reverse`, {
      params: {
        access_key: '7815906e36644cf3deff2dcb1981ee2d',
        query: ip
      }
    })
    fs.writeFileSync(file, JSON.stringify(data))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}

module.exports.resolveByGeo = async ({lat, lng}) => {
  let file = `./cache/result-${providerName}-${lat},${lng}.json`
  if (!fs.existsSync(file)) {
    let { data } = await axios.get(`http://api.positionstack.com/v1/reverse`, {
      params: {
        access_key: '7815906e36644cf3deff2dcb1981ee2d',
        query: `${lat},${lng}`
      }
    })
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  }

  let content = fs.readFileSync(file).toString()
  let data = JSON.parse(content)

  return _parseResponse(data)
}