"use strict"

const fs = require('fs');
const inside = require('point-in-polygon-hao');

fs.readFile(__dirname + "/../data/council-districts.json", "utf8", (err, geojson) => {
    
    if (err) throw err;
    const districts = JSON.parse(geojson)
    // console.log(districts)
    
    fs.readFile(__dirname + "/../data/ped-signals-filtered.json", "utf8", (err, geojson2) => {
      
        if (err) throw err;
        const signals = JSON.parse(geojson2)
        const outGeoJSON = countPoints(districts, signals)

        fs.writeFile(__dirname + '/../data/council-districts-counts.json', JSON.stringify(outGeoJSON), 'utf8', function (err) {

            if (err) throw err;

            // confirm results
            console.log('council-districts-counts.json written');
          })
    })
})

function countPoints(districts, signals) {
    // loop through each district
    // start count at 0
    // define polygon as the array of coordinates making up district shape
    districts.features.forEach((feature) => {
        let count = 0;
        const polygon = feature.geometry.coordinates;
     
        // loop through each pedestrian signal
        signals.features.forEach((row) => {
            const point = row.geometry.coordinates;
            const result = inside(point, polygon);
            // if test result is true, then increment count one
            if (result === true) {
                count++
            }
        })

        feature.properties.count = count;
    })

    return districts
}