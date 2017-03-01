//This script takes a Radius log and converts it into js format
let fs = require('fs');
let path = require('path');
let lineReader = require('line-reader');

RADIUS_LOG = process.argv[2]; //the third argument is the first user input

//Create out output folder.
let OUTPUT_PATH = path.join(__dirname, 'out');
if (!fs.existsSync(OUTPUT_PATH)){
    fs.mkdirSync(OUTPUT_PATH);
}

//Setup our file.
let OUTPUT_FILE = OUTPUT_PATH + RADIUS_LOG + `_out.js`;
fs.writeFile(OUTPUT_FILE, "module.exports = {\n", function(err) {
    if (err) {
        return console.log(err);
    }
})

function addLine(line){
    let finalLine = "";

    //Split up the line up by spaces.
    lineArray = line.split(/(\s+)/);
    for (let i = 0, len = lineArray.length; i < len; i++){
        if (line.startsWith("\t")){
            
        } else {
            //If the beginning of the line does not have a tab, then it is the date timestamp
            finalLine = line.split(' ').join('-');
        }
    }
    fs.writeFile(OUTPUT_FILE, finalLine, function(err){
        if (err) {
            console.log(err);
        }
    })
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