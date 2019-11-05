# Mapping Pedestrian Signal Lights in Nashville, TN

## Data Source--Nashville Open Data Portal--downloaded as geojsons
1. council districts
2. pedestrian signals

### Data Pre-Processing
1. Use mapshaper terminal command to simplify council district geojson to reduce size

    `mapshaper council-district-outlines.geojson -simplify 20% -o format=geojson ../data/council-districts.json`