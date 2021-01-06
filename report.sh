#!/bin/bash
for d in providers/*; do
  [[ -d $d ]] && PROVIDER_NAME=$(basename $d) || continue
  echo "testing ${PROVIDER_NAME}.."
  
  export JEST_HTML_REPORTERS_FILE_NAME="${PROVIDER_NAME}-ip.html"
  jest $PROVIDER_NAME/ip
  
  export JEST_HTML_REPORTERS_FILE_NAME="${PROVIDER_NAME}-geo.html"
  jest $PROVIDER_NAME/geo
done  