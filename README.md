# Radius-To-JS

A simple RADIUS log file converter written in JavaScript (requires Node 6.10.0+).

Converts a RADIUS log:
```
Tue Feb 28 00:00:00 2017
		User-Name = "a username"
		NAS-Port = 13
		NAS-IP-Address = 192.168.1.1
		Framed-IP-Address = 192.168.1.2
		NAS-Identifier = "BH011bW31"
		Airespace-Wlan-Id = 3
		Acct-Session-Id = "58b52dff/<MAC>/5769610"
		NAS-Port-Type = Wireless_802.11
		Cisco-AVPair = audit_session_id=0a156f1f006ae43e58b52dff
		Acct-Authentic = RADIUS
		Tunnel-Type:0 = VLAN
		Tunnel-Medium-Type:0 = IEEE-802
		Tunnel-Private-Group-Id:0 = 882
		Event-Timestamp = "Feb 28 2017 00:00:07 PST"
		Acct_Status_Type = Start
		Calling_Station_Id = "192.168.1.3"
		Called Station Id = "192.168.1.4"
		Acct Unique Session Id = ""
	    Timestamp = 1488268800
```
into a JS object:
```javascript
	"Tue_Feb_28_00_00_00_2017": {
		"User_Name": 'a username',
		"NAS_Port": '13',
		"NAS_IP_Address": '192.168.1.1',
		"Framed_IP_Address": '192.168.1.2',
		"NAS_Identifier": 'BH011bW31',
		"Airespace_Wlan_Id": '3',
		"Acct_Session_Id": '58b52dff/<MAC>/5769610',
		"NAS_Port_Type": 'Wireless_802.11',
		"Cisco_AVPair": 'audit_session_id=0a156f1f006ae43e58b52dff',
		"Acct_Authentic": 'RADIUS',
		"Tunnel_Type_0": 'VLAN',
		"Tunnel_Medium_Type_0": 'IEEE_802',
		"Tunnel_Private_Group_Id_0": '882',
		"Event_Timestamp": 'Feb_28_2017_00_00_07_PST',
		"Acct_Status_Type": 'Start',
		"Calling_Station_Id": '192.168.1.3',
		"Called_Station_Id": '192.168.1.4',
		"Acct_Unique_Session_Id": '',
		"Timestamp": '1488268800',
	},
```

The end file will end look something like this:
```
module.exports = {
	"Tue_Feb_28_00_00_00_2017": {
		"User_Name": 'a username',
		"NAS_Port": '13',
		"NAS_IP_Address": '192.168.1.1',
		"Framed_IP_Address": '192.168.1.2',
		"NAS_Identifier": 'BH011bW31',
		"Airespace_Wlan_Id": '3',
		"Acct_Session_Id": '58b52dff/<MAC>/5769610',
		"NAS_Port_Type": 'Wireless_802.11',
		"Cisco_AVPair": 'audit_session_id=0a156f1f006ae43e58b52dff',
		"Acct_Authentic": 'RADIUS',
		"Tunnel_Type_0": 'VLAN',
		"Tunnel_Medium_Type_0": 'IEEE_802',
		"Tunnel_Private_Group_Id_0": '882',
		"Event_Timestamp": 'Feb_28_2017_00_00_07_PST',
		"Acct_Status_Type": 'Start',
		"Calling_Station_Id": '192.168.1.3',
		"Called_Station_Id": '192.168.1.4',
		"Acct_Unique_Session_Id": '',
		"Timestamp": '1488268800',
	}
}
```
  
Example Usage:

```
C:\Users\carol\Documents\GitHub\Radius-To-JS> node .\radius-to-js.js "C:\Users\carol\Documents\Radius Logs\Vali\vali-detail-20170228"
> Starting...
> Writing file...
> Finished!
```

The file is formatted so that all you have to do to proccess the data is as follows:
```javascript
require('.\vali-detail-20170228_output.js');
//require('.\<original-name>_output.js');
```
