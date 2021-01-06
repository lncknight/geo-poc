#!/bin/bash
PROVIDER=geocode.xyz
RESULT_FILE=result-${PROVIDER}-${IP_ADDRESS}.json

curl -s "https://geocode.xyz/${IP_ADDRESS}?json=1" | jq > $RESULT_FILE
cat $RESULT_FILE | jq '[.osmtags.name_en, .region, .state, .country]'