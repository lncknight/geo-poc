#!/bin/bash
API_KEY="AIzaSyAofPvQrMEv3kM5xOZtDYOgl-_YPpwdjN0"
curl -X POST https://www.googleapis.com/geolocation/v1/geolocate?key=$API_KEY -d '{
  "considerIp": "true"
}'
https://maps.googleapis.com/maps/api/geocode/json?key=$API_KEY

