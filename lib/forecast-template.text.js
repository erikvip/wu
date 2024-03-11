include "common";
([ .[] | (.day .qpfSnowWidget | length) + (.day .qpfWidget | length ) ] | max) as $dayQpfLen |
([ .[] | (.night .qpfSnowWidget | length) + (.night .qpfWidget | length ) ] | max) as $nightQpfLen |
([ .[] | (.qpfSnowWidget | length) + (.qpfWidget | length ) ] | max) as $totalQpfLen |


.[] | moonPhaseWidget(.moonPhaseCode)
	+ "\(.validTimeUtc|strftime("%d %a"))" +
	#" \(.temperatureWidget) ⌮  \(.qpfWidget)\(.qpfSnowWidget)"
	" \(.temperatureWidget) "+
 (if env._WU_OPT_DAYNIGHT == "1" then "" else 
	"⌮ " + ( "\(.qpfWidget)\(.qpfSnowWidget)" | rpad( . ; $totalQpfLen) | tostring)
end) + (if env._WU_OPT_TOTALS == "1" then "" else 
	#",㏂\(.day.cloudCoverWidget) \(.day.precipChanceWidget) \(.day.thunderWidget) \(.day.qpfWidget)\(.day.qpfSnowWidget)"
	" ㏂\(.day.cloudCoverWidget) \(.day.precipChanceWidget) \(.day.thunderWidget//" ") " + ( "\(.day.qpfWidget)\(.day.qpfSnowWidget)" | rpad( . ; $dayQpfLen+1; " ") | tostring)
	#+",🌫:\(.day.windSpeed) \(.day.windDirectionCardinal)"
	+("\(.day.windWidget)" | rpad(.; 8))
	#+"㏘\(.night.cloudCoverWidget) \(.night.precipChanceWidget) \(.night.thunderWidget) \(.night.qpfWidget)\(.night.qpfSnowWidget)"
	+" ㏘\(.night.cloudCoverWidget) \(.night.precipChanceWidget) \(.night.thunderWidget//" ") " + ( "\(.night.qpfWidget)\(.night.qpfSnowWidget)" | rpad( . ; $nightQpfLen+1; " ") | tostring)
	#+",🌫:\(.night.windSpeed) \(.night.windDirectionCardinal)"
	#+"\(.night.windWidget)"
	+("\(.night.windWidget)" | rpad(.; 8))
	#+ "\n--------------------------------------------"
end)