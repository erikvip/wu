.[] | (	if .moonPhaseCode == "F" 
		then "🌕"
	elif .moonPhaseCode == "WNC" 
		then "🌘" 
	elif .moonPhaseCode == "LQ"
		then "🌗"
	elif .moonPhaseCode == "WNG"
		then "🌖"
	elif .moonPhaseCode == "N" 
		then "🌑" 
	elif .moonPhaseCode == "WXC" 
		then "🌒" 
	elif .moonPhaseCode == "FQ"
		then "🌓"
	elif .moonPhaseCode == "WXG"
		then "🌔"
	else .moonPhaseCode 
	end
) 
+ "\(.validTimeUtc|strftime("%d %a"))" +
" \(.temperatureWidget) ⌮  🌧:\(.qpfWidget)\(.qpfSnowWidget)"

#+ "☔" + 

+",㏂\(.day.cloudCoverWidget) \(.day.precipChanceWidget) 🌧:\(.day.qpfWidget)\(.day.qpfSnowWidget)"
+",㏘\(.night.cloudCoverWidget) \(.night.precipChanceWidget) 🌧:\(.night.qpfWidget)\(.night.qpfSnowWidget)"

#+",🌧:\(.night.qpf),❄\(.night.qpfSnow)\", ⅔," 

#+ ",⛅"+(if .day.cloudCover == 100 then "💯" else .day.cloudCover//"--" end|tostring) + "%"

#+","+(.day.wxPhraseShort//"-") 
#+ ", 🝯 \(.night.wxPhraseShort)"
#+ ",\(.night.qpf)(\(.night.qpfSnow))"
