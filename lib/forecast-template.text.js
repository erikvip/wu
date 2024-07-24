include "common";
([ .[] | (.day .qpfSnowWidget | length) + (.day .qpfWidget | length ) ] | max) as $dayQpfLen |
([ .[] | (.night .qpfSnowWidget | length) + (.night .qpfWidget | length ) ] | max) as $nightQpfLen |
([ .[] | (.outlook.qpfSnowWidget | length) + (.outlook.qpfWidget | length ) ] | max) as $totalQpfLen |

.[] | moonPhaseWidget(.outlook.moonPhaseCode)
	+ "\(.outlook.validTimeUtc|strftime("%d %a"))" +
	#" \(.temperatureWidget) ⌮  \(.qpfWidget)\(.qpfSnowWidget)"
	" \(.outlook.temperatureWidget) "+
 (if env._WU_OPT_DAYNIGHT == "1" then "" else 
	"⌮ " + ( "\(.outlook.qpfWidget)\(.outlook.qpfSnowWidget)" | rpad( . ; $totalQpfLen) | tostring)
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
end) + 

(if env._WU_OPT_ASTRO == "0" or .astroData == null then "WTF" else 
#	"\(.astroData.visibleLight) \(.astroData.lengthOfDay) \(.astroData.tomorrowDaylightDifference)"
# "sunoutlook:\(.outlook.sunriseTimeLocal)"+
""
#	+" 💡\(.astroData.visibleLight|abbr_hms)"
#	+" ⏲ \(.astroData.lengthOfDay|abbr_hms)" 
#	+"sun:\(.astroData.sun.twilight.civil.dawnLocal) \(.outlook.sunriseTimeLocal)" 

	+" 🌄\(.astroData.sun.riseSet.riseLocal|parselocaldate|strftime("%l:%M%P"))\(.astroData.sun.riseSet.setLocal|parselocaldate|strftime("%l:%M%P")) \(.astroData.lengthOfDay|abbr_hms)"
 	+" 🌆\(.astroData.sun.twilight.civil.dawnLocal|parselocaldate|strftime("%l:%M%P"))\(.astroData.sun.twilight.civil.duskLocal|parselocaldate|strftime("%l:%M%P")) \(.astroData.visibleLight|abbr_hms)"

#	+"moon:\(.astroData.moon.riseSet.riseLocal)"


end)