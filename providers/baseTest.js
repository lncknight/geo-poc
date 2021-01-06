const fs = require('fs');
const { map, get, first, slice } = require('lodash');
let testIpData = require('../test_data_ip.json')
let testGeoData = require('../test_data_geo.json')

module.exports.testBasic = ({
  resolveByIp, resolveByGeo, providerName
}) => {
  // testIpData = slice(testIpData, 0, 8)
  map(testIpData, async ({ ip, country_code, regions }) => {
    test(`${providerName}-${ip}-country`, async () => {
      let {
        regions: providerRegion, country_code: providerCountry
      } = await resolveByIp(ip)
      expect(providerCountry).toBe(country_code);
    });
  })

  if (resolveByGeo) {
    map(testGeoData, async ({ latlng, country_code, regions }) => {
      let lat = latlng[0]
      let lng = latlng[1]
      test(`${providerName}-${lat},${lng}-country`, async () => {
        let {
          regions: providerRegion, country_code: providerCountry
        } = await resolveByGeo({ lat: latlng[0], lng: latlng[1] })
        expect(providerCountry).toBe(country_code);
      });
      test(`${providerName}-${lat},${lng}-region`, async () => {
        let {
          regions: providerRegion, country_code: providerCountry
        } = await resolveByGeo({ lat: latlng[0], lng: latlng[1] })
        expect(providerRegion).toEqual(expect.arrayContaining(regions));
      });
    })
  }

}