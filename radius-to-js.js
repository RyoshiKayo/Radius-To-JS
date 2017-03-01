//This script takes a Radius log and converts it into js format
let fs = require('fs');
let path = require('path');
let lineReader = require('line-reader');

//TODO Check for path or filename.
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
writeLine(`module.exports = {`);
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
        writeLine(`${"\t"}${lineArray[0]}: {`);
        writeLine(`${"\t"}${"\tab"}${lineArray2[0]}: '${lineArray2[1]}'`);
        writeLine(`${"\t}"}`);
    }

    if (!lineArray[1])
    writeLine(`${"\t"}${lineArray[0]}:  ${lineArray[1]},`);

    if (last) {
        writeLine(`}`);
        return false;
    }
});

writeLine(`}`);

console.log('>Done!');

function writeLine(str){
    fs.writeFileSync(OUTPUT_FILE, `${str}\n`, function(err){
        if (err) console.log(`[ERR]${err}[/ERR]`);
    });
}

//Tue Feb 28 17:21:42 2017
//	User-Name = "crumpa"
//	NAS-Port = 13
//	NAS-IP-Address = 10.21.111.31
//	Framed-IP-Address = 67.201.214.89
//	NAS-Identifier = "BH011bW31"
//	Airespace-Wlan-Id = 3
//	Acct-Session-Id = "58b62226/e0:5f:45:37:98:bf/5804651"
//	NAS-Port-Type = Wireless-802.11
//	Cisco-AVPair = "audit-session-id=0a156f1f006b87cb58b62226"
//	Acct-Authentic = RADIUS
//	Tunnel-Type:0 = VLAN
//	Tunnel-Medium-Type:0 = IEEE-802
//	Tunnel-Private-Group-Id:0 = "882"
//	Event-Timestamp = "Feb 28 2017 17:21:49 PST"
//	Acct-Status-Type = Start
//	Calling-Station-Id = "67.201.214.89"
//	Called-Station-Id = "10.21.111.31"
//	Acct-Unique-Session-Id = "0b65af2558795b39"
//	Timestamp = 1488331302

// function addLine(line){
//     let finalLine = "";

//     //Split up the line up by spaces.
//     lineArray = line.split(/(\s+)/);
//     for (let i = 0, len = lineArray.length; i < len; i++){
//         if (line.startsWith("\t")){
            
//         } else {
//             //If the beginning of the line does not have a tab, then it is the date timestamp
//             finalLine = line.split(' ').join('-');
//         }
//     }
//     fs.writeFile(OUTPUT_FILE, finalLine, function(err){
//         if (err) {
//             console.log(err);
//         }
//     })
// }

