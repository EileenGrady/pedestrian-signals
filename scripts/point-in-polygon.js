"use strict"

var fs = require('fs');
var inside = require('point-in-polygon');

fs.readFile(__dirname + "/../data/council-districts.json", "utf8", (err, geojson) => {
    
    if (err) throw err;
    var districts = JSON.parse(geojson)
    
    fs.readFile(__dirname + "/../data/ped-signals-filtered.json", "utf8", (err, geojson2) => {
      
        if (err) throw err;
        var signals = JSON.parse(geojson2)
        countPoints(districts, signals)
    })
})

function countPoints(districts, signals) {
    districts.features.forEach((feature) => {
        let count = 0;
        var polygon = feature.geometry.coordinates
        signals.features.forEach((feature) => {
            var x = feature.properties.evnt_lat
            var y = feature.properties.evnt_lon
            // console.log(point)
            if (x == null) {
                // console.log('skip')
            } else {
            var result = (inside([x,y], polygon))
            }
            if (result == true) {
                count++
            }
        })

        feature.properties.count = count;
        console.log(count)
    })
}