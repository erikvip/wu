include "common";
. as $root | (.validTimeLocal[0:24] | to_entries | map(.key)) | 
map( 
	($root.validTimeLocal[.]|strptime("%Y-%m-%dT%H:%M:%S%Z")|mktime|strftime("%H:00 ")) 
	+ "," + ( "\($root.temperature[.])℉" )
	+ "," + ( cloudCoverWidget($root.cloudCover[.]) ) 
	+ "," + ( precipChanceWidget($root.precipChance[.]) ) 
	+ "," + ( qpfWidget($root.qpf[.]) ) 
	+ "," + ( qpfSnowWidget($root.qpfSnow[.]) ) 
	#+ "," + ( "\($root.relativeHumidity[.])" )
) | .[] 