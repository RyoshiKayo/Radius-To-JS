//This script takes a Radius log and converts it into js format
let fs = require('fs')

global.RADIUS_LOG = __dirname + process.argv[2] //the third argument is the first user input

//Create out output folder.
let OUTPUT_PATH = BASE_PATH + 'out'
if (!fs.existsSync(OUTPUT_PATH)){
    fs.mkdirSync(OUTPUT_PATH)
}

//Setup our file.
let OUTPUT_FILE = OUTPUT_PATH + RADIUS_LOG + `_out`
let fileBase = "module.exports = {\n}"
fs.writeFile(OUTPUT_FILE, fileBase, function(err) {
    if (err) {
        return console.log(err)
    }
})

