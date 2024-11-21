include "common";
12 as $r | 
#opts = {showEmptyIcons: true }|
#. as $root | (.validTimeLocal[0:24] | to_entries | map(.key)) | 
#. as $root | (.validTimeLocal[0:12] | to_entries | map(.key)) | 
. as $root | ( [range(0;$r;1)] ) | 
#.  as $root | (.validTimeLocal[0:348] | to_entries | map(.key)) | 
#. as $root | ([0,1,2,3,4,5,6,7,8,9,10.11] | to_entries | map(.key)) |

map( 
	($root.validTimeLocal[.]|strptime("%Y-%m-%dT%H:%M:%S%z")|mktime|strftime("%m/%d %H%P")) 
	+ "," + (.|tostring)
	+ "," + ( "\($root.temperature[.])℉" )
	+ "," + ( cloudCoverWidget($root.cloudCover[.]) ) 
	+ "," + ( precipChanceWidget($root.precipChance[.]) ) 
	+ "," + ( qpfWidget($root.qpf[.]) ) 
	+ "," + ( qpfSnowWidget($root.qpfSnow[.]) ) 
	+ "," + ( "🌫:\($root.windSpeed[.]) \($root.windDirectionCardinal[.])" )
	#+ "," + ( "\($root.relativeHumidity[.])" )
	+",│ "+
	($root.validTimeLocal[.+$r]|strptime("%Y-%m-%dT%H:%M:%S%z")|mktime|strftime("%m/%d %H%P")) 
	+ "," + (.|tostring)
	+ "," + ( "\($root.temperature[.+12])℉" )
	+ "," + ( cloudCoverWidget($root.cloudCover[.+12]) ) 
	+ "," + ( precipChanceWidget($root.precipChance[.+12]) ) 
	+ "," + ( qpfWidget($root.qpf[.+12]) ) 
	+ "," + ( qpfSnowWidget($root.qpfSnow[.+12]) ) 
	+ "," + ( "🌫:\($root.windSpeed[.+12]) \($root.windDirectionCardinal[.+12])" )
	#+ "," + ( "\($root.relativeHumidity[.+12])" )



) | .[] 
