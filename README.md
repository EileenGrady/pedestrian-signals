# Mapping Pedestrian Signal Lights in Nashville, TN

## Data downloaded from [Nashville Open Data Portal](https://data.nashville.gov/)

1. [Council District Outlines](https://data.nashville.gov/General-Government/Council-District-Outlines-GIS-/iw7r-m8qr)
2. [Pedestrian Signal Inventory and ADA Self-Assessments](https://data.nashville.gov/Transportation/Pedestrian-Signal-Inventory-and-ADA-Self-Assessmen/6xet-f7u7)

## npm Packages

1. [point-in-polygon-hao](https://www.npmjs.com/package/point-in-polygon-hao)
2. [Leaflet Choropleth](https://www.npmjs.com/package/leaflet-choropleth)
3. [Mapshaper](https://www.npmjs.com/package/mapshaper)

## The Process

1. Use mapshaper terminal command to simplify council district geojson to reduce size.

    `mapshaper council-district-outlines.geojson -simplify 20% -o format=geojson ../data/council-districts.json`

2. Use node terminal command to reduce precision, remove extra fields, and remove null values from pedestrian signal geojson.

    `node scripts/simplify-filter.js`

3. Use node terminal command to aggregate the number of pedestrian signals in each council district, returning a new file with a count field.

    `node scripts/point-in-polygon.js`

4. Use node terminal command to extract TealGrn color scheme from cartocolors.json.

    `node scripts/extract-colors.js`

5. Use Leaflet Choropleth plugin to symbolize the district layer using a quanitative color scheme, and style cooresponding legend.