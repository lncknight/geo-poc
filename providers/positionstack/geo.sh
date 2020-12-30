#!/bin/bash
ACCESS_KEY=7815906e36644cf3deff2dcb1981ee2d
PROVIDER=positionstack
RESULT_FILE=result-${PROVIDER}-${GEO}.json

curl -s "http://api.positionstack.com/v1/reverse?access_key=$ACCESS_KEY&query=${GEO}" | jq > $RESULT_FILE
cat $RESULT_FILE | jq -r '.data[] | [.country_code, .region]'