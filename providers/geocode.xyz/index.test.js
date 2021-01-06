const { resolveByIp, resolveByGeo, providerName } = require('./index.js');
const { testBasic } = require('../baseTest.js')

testBasic({
  resolveByIp, resolveByGeo, providerName
})