"use strict"

var fs = require('fs');
var inside = require('point-in-polygon');

fs.readFile(__dirname + "/../data/council-districts.json", "utf8", (err, geojson) => {
    
    if (err) throw err;
    var districts = JSON.parse(geojson)
    // console.log(districts)
    
    fs.readFile(__dirname + "/../data/ped-signals-filtered.json", "utf8", (err, geojson2) => {
      
        if (err) throw err;
        var signals = JSON.parse(geojson2)
        countPoints(districts, signals)
    })
})

function countPoints(districts, signals) {
    // loop through each district
    // start count at 0
    // define polygon as the array of coordinates making up district shape
    districts.features.forEach((feature) => {
        let count = 0;
        var polygon = feature.geometry.coordinates;
     
        // loop through each pedestrian signal
        signals.features.forEach((row) => {
            var x = row.properties.evnt_lon;
            
            // ran into null values, so this skips over any null values
            // then define point as the signal point geometry
            // test to see if the signal is inside the district polygon
            // test returns boolean true or false
            if (x === null) {
                // console.log('skip')
            } else {
                var point = row.geometry.coordinates;
                var result = inside(point, polygon);
            }
            // if test result is true, then increment count one
            if (result === true) {
                count++
            }
        })

        feature.properties.count = count;
        console.log(feature.properties.count)
    })
}