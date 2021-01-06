const { resolveByIp, resolveByGeo, providerName } = require('./index.js');
const { testBasicIp, testBasic, testBasicGeo } = require('../baseTest.js')

testBasicIp({
  resolveByIp, resolveByGeo, providerName
})