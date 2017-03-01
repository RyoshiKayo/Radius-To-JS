//This script takes a Radius log and converts it into js format
let fs = require('fs')
let lineReader = require('line-reader')

global.RADIUS_LOG = __dirname + process.argv[2] //the third argument is the first user input

//Create out output folder.
let OUTPUT_PATH = BASE_PATH + 'out'
if (!fs.existsSync(OUTPUT_PATH)){
    fs.mkdirSync(OUTPUT_PATH)
}

//Setup our file.
let OUTPUT_FILE = OUTPUT_PATH + RADIUS_LOG + `_out.js`
let fileBase = "module.exports = {\n"
fs.writeFile(OUTPUT_FILE, fileBase, function(err) {
    if (err) {
        return console.log(err)
    }
})

function addLine(line){
    let finalLine = ""

    //Split up the line up by spaces.
    lineArray = line.split(/(\s+)/)
    for (let i = 0, len = lineArray.length; i < len; i++){
        if (lineArray[i].startsWith("\t")){

        } else {
            //If the beginning of the line does not have a tab, then it is the date timestamp
            finalLine = line.split(' ').join('-')
        }
    }
    fs.writeFile(OUTPUT_FILE, finalLine, function(err){
        if (err) {
            console.log(err)
        }
    })
}