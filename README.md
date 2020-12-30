# GEO info research
Research geocoding services fit for use case

# Acceptance criteria
- precise result
  - IP: down to regions (i.e. Tseung Kwan O, HK)
  - Latlng: down to regions (i.e. Tseung Kwan O, HK)
- cost effeciency

# Weighting table
https://docs.google.com/spreadsheets/d/1Ayx4MgviTMX6W6zMlPxSXq9JCL5Bh0MYyGtSIWkkh7M/edit#gid=0

# Test provider
```
bash providers/PROVIDER/IP_OR_GEO.sh
```

- test by ip address
```
export IP_ADDRESS=$(curl -s ip.me)
bash providers/positionstack/ip.sh
```

- test by latlng
```
export GEO=22.2843703,114.2670032
bash providers/positionstack/geo.sh
```
