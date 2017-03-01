//This script takes a Radius log and converts it into js format
let fs = require('fs');
let path = require('path');
let lineReader = require('line-reader');
let tmp;

let RADIUS_LOG = {
    fileName: (fs.lstatSync(process.argv[2]).isFile ? path.basename(process.argv[2]) : path.basename(process.argv[2])),
    fileFullPath: (fs.lstatSync(process.argv[2]).isDirectory ? process.argv[2] : path.join(__dirname, process.argv[2]))
}

console.log('>Staring...');

//Create out output folder.
let OUTPUT_PATH = path.join(__dirname, 'out');
if (!fs.existsSync(OUTPUT_PATH)){
    fs.mkdirSync(OUTPUT_PATH);
    console.log('>Created output path...');
}

//Setup our file.
let OUTPUT_FILE = path.join(OUTPUT_PATH, RADIUS_LOG.fileName) + `_out.js`;
myWriteLine(`module.exports = {`);
console.log('>File init finished...');

lineReader.eachLine(RADIUS_LOG.fileFullPath, function(line, last){
    if (line = null || line == "") return;
    let lineArray2 = [];
    let lineArray = line.toString().split(' ').filter(val => val !== '=');
    
    //Check if the array has an equals sign for any values.
    for (i = 0, len = lineArray.length; i < len; i++) {
        //Split up the value again if contains and equals.
        if (lineArray[i].includes('=') && i !== 0){
            lineArray2 = lineArray[i].split(' ').filter(val => val !== '=');
            lineArray.splice(i, i);
        }

        lineArray[i].replace("\"", "\'");
        if (i % 2 == 0) {
            lineArray[i] = `'${lineArray[i]}'`;
        } else {
            lineArray[i].replace("\"", "");
        }
    }

    //Check if there is a lineArray2.
    if (lineArray.length == 1) {
        if (lineArray2.length >=1 && lineArray2[1] != null && !lineArra2[1].includes('\"')){
            lineArray2[1].replace("\"", "\'");
        }
        myWriteLine(`${"\t"}${lineArray[0]}: {`);
        myWriteLine(`${"\t"}${"\tab"}${lineArray2[0]}: '${lineArray2[1]}'`);
        myWriteLine(`${"\t}"}`);
    }

    if (!lineArray[1])
    myWriteLine(`${"\t"}${lineArray[0]}:  ${lineArray[1]},`);

    if (last) {
        myWriteLine(`}`);
        return false;
    }
});

myWriteLine(`}`);

fs.writeFile(OUTPUT_FILE, tmp, function(err){
    if (err) console.log(err);
});

console.log('>Done!');

function myWriteLine(str){
    tmp += str;
    // fs.writeFileSync(OUTPUT_FILE, `${str}\n`, function(err){
    //     if (err) console.log(`[ERR]${err}[/ERR]`);
    // });
}
