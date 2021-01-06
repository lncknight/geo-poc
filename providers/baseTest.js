require('jest-extended');

const fs = require('fs');
const { map, get, first, slice, chain } = require('lodash');
let testIpData = require('../test_data_ip.json')
let testGeoData = require('../test_data_geo.json')

const testBasicIp = ({
  resolveByIp, resolveByGeo, providerName
}) => {
  // testIpData = slice(testIpData, 0, 8)

  if (resolveByIp){
    map(testIpData, async ({ ip, country_code, regions }) => {
      regions = chain(regions).filter().value() // filter empty string

      test(`${providerName}-${ip}-country`, async () => {
        let {
          regions: providerRegion, country_code: providerCountry
        } = await resolveByIp(ip)
        expect(providerCountry).toBe(country_code);
      });
      // test(`${providerName}-${ip}-region`, async () => {
      //   let {
      //     regions: providerRegion, country_code: providerCountry
      //   } = await resolveByIp(ip)
      //   expect(providerRegion).toIncludeAnyMembers(regions);
      //   // expect(providerRegion).toIncludeValues(regions);
      //   // expect(providerRegion).toEqual(expect.arrayContaining(regions));
      // });
    })
  }

}

module.exports.testBasic = testBasicIp
module.exports.testBasicIp = testBasicIp
module.exports.testBasicGeo = ({
  resolveByIp, resolveByGeo, providerName
}) => {
  
  if (resolveByGeo) {
    map(testGeoData, async ({ latlng, country_code, regions }) => {
      regions = chain(regions).filter().value() // filter empty string
      
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
        expect(providerRegion).toIncludeAnyMembers(regions);
        // expect(providerRegion).toIncludeValues(regions);
        // expect(providerRegion).toEqual(expect.arrayContaining(regions));
      });
    })
  }

}