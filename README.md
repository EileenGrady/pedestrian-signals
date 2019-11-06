# Mapping Pedestrian Signal Lights in Nashville, TN

## Data Source--Nashville Open Data Portal--downloaded as geojsons
1. council districts
2. pedestrian signals

### Data Pre-Processing
1. Use mapshaper terminal command to simplify council district geojson to reduce size

    `mapshaper council-district-outlines.geojson -simplify 20% -o format=geojson ../data/council-districts.json`

2. Use node simplify-filter.js to simplify and remove extra fields from pedestrian signal geojson.

3. Attempt to use point-in-polygon npm package to calculate the number of pedestrian signals in each district, and then hoped to symbolize the districts quantitatively based on this number.

4. After being unable to get the point-in-polygon package to work, I had to rethink my plan. The district layer has 33 districts and no attributes with which to aggregate or symbolize by without having the pedestrian signal count. So I downloaded another layer, service districts in Nashville to symbolize thematically using a qualitative scheme from cartocolors.json.

4. Use mapshaper terminal command to simplify service district geojson to reduce size.
    
    `mapshaper service-districts.geojson -simplify 20% -o precision=.0001  format=geojson ../data/service-districts-simplify.json`