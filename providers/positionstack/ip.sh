#!/bin/bash
ACCESS_KEY=7815906e36644cf3deff2dcb1981ee2d
PROVIDER=positionstack
RESULT_FILE=result-${PROVIDER}-${IP_ADDRESS}.json

curl -s "http://api.positionstack.com/v1/reverse?access_key=$ACCESS_KEY&query=${IP_ADDRESS}" | jq > $RESULT_FILE
cat $RESULT_FILE | jq -r '.data[] | [.country_code, .region]'