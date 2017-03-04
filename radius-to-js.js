//This script takes a Radius log and converts it into js format
let fs = require('fs');
let path = require('path'); 
let lineReader = require('line-reader');

let toWrite = "";
let radiusLog = process.argv[2]; //Assume that the arg is going to be the full path.
let outputFile = path.join(__dirname, path.basename(radiusLog) + "_output.js");

console.log('> Starting...');

//Make sure that the arg contains the filename, that it isn't a js file, and the output isn't already there.
if (radiusLog.slice(-1) == path.sep) {
    return console.log('Argument must have the filename!');
} else if (path.extname(radiusLog) == '.js') {
    return console.log('File given is js file!');
} else if (fs.exists(outputFile)) {
    return console.log('A js version already exists!');
}

//Add the beginning of out file.
toWrite += "modules.export { \n";

lineReader.eachLine(radiusLog, function(line, last) {
    if (line.startsWith("\t") && line !== "") {
        let lineArray = line.toString().split(' ').filter(val => val !== '=');
        if (lineArray[0] !== "\tEvent-Timestamp") {
            toWrite += "\t" + lineArray[0] + ": \'" + lineArray[1].replace(/['"]+/g, '') + "\',\n";
        } else {
            let tempArray = [...lineArray];
            tempArray.splice(0, 1);
            toWrite += "\t" + lineArray[0] + ": \'" + tempArray.join('-').replace(/['"]+/g, '') + "\',\n";
        }
    } else if (!line.startsWith("\t") && line !== "") {
        toWrite += "\t" + line.replace(/ /g, '-') + ": {\n";
    } else if (line == "") {
        toWrite += "\t},\n";
    } else {
        console.log('Got a wierd line...');
    }

    if (last) {
        toWrite += "}";
        fs.writeFile(outputFile, toWrite, function(err){
            if (err) console.log(err);
        });
        console.log('> Writing file...');
        return console.log('> Finished!');
    }
}); 