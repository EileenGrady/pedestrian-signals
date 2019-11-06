// load npm packages to use in scripts
const fs = require('fs');

function extractColors() {

  // read cartocolors json file into script
  // returns 'response'
  fs.readFile(__dirname + '/../project-files/cartocolors.json', function (err, response) {

    if (err) throw err;

    // confirm data reads in correctly
    console.log("cartocolors.json data loaded!");

    // parse raw data string into JSON
    const data = JSON.parse(response);

    console.log("cartocolors.json data parsed to JSON");

    // define output as an object called 'Vivid', made up of the object 'Vivid' from the parsed json cartocolors file
    const outputData = {
      'Prism': data['Prism']
    };

    console.log("prism scheme extracted from parsed data");

    // write outputData containing just the vivid color object to json file
    fs.writeFile(__dirname + '/../data/prism-colors.json', JSON.stringify(outputData), 'utf-8', function (err) {

      if (err) throw err;

      console.log('prism-colors.json written to data/ dir');
    });
  });
}

// export function to use in other scripts
exports.extractColors = extractColors

extractColors()