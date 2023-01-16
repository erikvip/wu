def fraction(dec):
	dec//0 | (floor|tostring) as $int | 
	("0."+(.|tostring|split(".")[1]) )| tonumber as $rem |

#		(dec|tostring) + 
#		$rem|tostring+
		(if $int|tonumber > 0 then $int else "" end) +
		(if $rem < 0.05 then ""
		 elif $rem > 0.05 and $rem <=0.10 then "⅒ "
		 elif $rem > 0.10 and $rem < 0.14 then "⅛"
		 elif $rem >= 0.14 and $rem <= 0.15 then "⅐"
		 elif $rem > 0.15 and $rem <=0.18 then "⅙"
		 elif $rem >= 0.19 and $rem <=0.22 then "⅕"
		 elif $rem >= 0.23 and $rem <=0.28 then "¼"
		 elif $rem >= 0.29 and $rem <=0.34 then "¼"
		 elif $rem >= 0.35 and $rem <=0.38 then "⅜"
		 elif $rem >= 0.39 and $rem <=0.44 then "⅖"
		 elif $rem >= 0.45 and $rem <=0.54 then "½"
		 elif $rem >= 0.55 and $rem <=0.61 then "⅗"
		 elif $rem >= 0.62 and $rem <=0.64 then "⅝"	
		 elif $rem >= 0.65 and $rem <=0.69 then "⅔"
		 elif $rem >= 0.70 and $rem <=0.77 then "¾"
		 elif $rem >= 0.78 and $rem <=0.81 then "⅘"
		 elif $rem >= 0.82 and $rem <=0.85 then "⅚"		 
		 elif $rem >= 0.86 then "⅞"		 		 
		 else ""
		end)|tostring |
		( if . == "" then "0" else . end) | tostring + "\""
	;

def temperatureWidget(low; high):
	("↑" + (high // "--"|tostring) + "℉ ↓" + (low // "--"|tostring) + "℉")
	;
def precipChanceWidget(per):
	("☔" + 
		(if per == 100 	then "💯 " 
		elif per < 10 	then " \(per)%"
		else 			"\(per)%" 
		end)
	)		
	;
#def qpfWidget(amt): "🌧:\(amt)\"";
#def qpfWidget(amt): "🌧:\(amt) "+fraction(amt);
def qpfWidget(amt): "🌧 :"+fraction(amt);
#def qpfSnowWidget(amt): "❄:\(amt)\"";
#def qpfSnowWidget(amt): "❄:\(amt) "+fraction(amt);
def qpfSnowWidget(amt): "❄:"+fraction(amt);
def cloudCoverWidget(per):
	("⛅" + 
		(if per == 100 then "💯" 
		else (per//"--" | tostring + "%")
		end) 
	)
	;
def moonPhaseWidget(code):
	(if code == "F" 
		then "🌕"
	elif code == "WNC" 
		then "🌘" 
	elif code == "LQ"
		then "🌗"
	elif code == "WNG"
		then "🌖"
	elif code == "N" 
		then "🌑" 
	elif code == "WXC" 
		then "🌒" 
	elif code == "FQ"
		then "🌓"
	elif code == "WXG"
		then "🌔"
	else code 
	end)
	;



.[] | 
	{
		dayOfWeek					: $w[].dayOfWeek[.],
		calendarDayTemperatureMax	: $w[].calendarDayTemperatureMax[.],
		calendarDayTemperatureMin 	: $w[].calendarDayTemperatureMin[.],
		expirationTimeUtc 			: $w[].expirationTimeUtc[.],
		moonPhase 					: $w[].moonPhase[.],
		moonPhaseCode 				: $w[].moonPhaseCode[.],
		moonPhaseDay 				: $w[].moonPhaseDay[.],
		moonriseTimeLocal 			: $w[].moonriseTimeLocal[.],
		moonriseTimeUtc 			: $w[].moonriseTimeUtc[.],
		moonsetTimeLocal 			: $w[].moonsetTimeLocal[.],
		moonsetTimeUtc 				: $w[].moonsetTimeUtc[.],
		narrative 					: $w[].narrative[.],
		qpf 						: $w[].qpf[.],
		qpfSnow 					: $w[].qpfSnow[.],
		sunriseTimeLocal 			: $w[].sunriseTimeLocal[.],
		sunriseTimeUtc				: $w[].sunriseTimeUtc[.],
		sunsetTimeLocal 			: $w[].sunsetTimeLocal[.],
		sunsetTimeUtc 				: $w[].sunsetTimeUtc[.],
		temperatureMax 				: $w[].temperatureMax[.],
		temperatureMin 				: $w[].temperatureMin[.],
		validTimeLocal 				: $w[].validTimeLocal[.],
		validTimeUtc 				: $w[].validTimeUtc[.],
		temperatureWidget			: temperatureWidget($w[].temperatureMin[.]; $w[].temperatureMax[.]),
#		precipChanceWidget			: precipChanceWidget($w[].precipChance[.]),
		qpfWidget					: qpfWidget($w[].qpf[.]),
		qpfSnowWidget				: qpfSnowWidget($w[].qpfSnow[.]),		
		day: {
			cloudCover				: $w[].daypart[].cloudCover[(.+.)],
			cloudCoverWidget		: cloudCoverWidget($w[].daypart[].cloudCover[(.+.)]),
			dayOrNight				: $w[].daypart[].dayOrNight[(.+.)],
			daypartName				: $w[].daypart[].daypartName[(.+.)],
			iconCode				: $w[].daypart[].iconCode[(.+.)],
			iconCodeExtend			: $w[].daypart[].iconCodeExtend[(.+.)],
			narrative				: $w[].daypart[].narrative[(.+.)],
			precipChance			: $w[].daypart[].precipChance[(.+.)],
			precipType				: $w[].daypart[].precipType[(.+.)],
			qpf						: $w[].daypart[].qpf[(.+.)],
			qpfSnow					: $w[].daypart[].qpfSnow[(.+.)],
			qualifierCode			: $w[].daypart[].qualifierCode[(.+.)],
			qualifierPhrase			: $w[].daypart[].qualifierPhrase[(.+.)],
			relativeHumidity		: $w[].daypart[].relativeHumidity[(.+.)],
			snowRange				: $w[].daypart[].snowRange[(.+.)],
			temperature				: $w[].daypart[].temperature[(.+.)],
			temperatureHeatIndex	: $w[].daypart[].temperatureHeatIndex[(.+.)],
			temperatureWindChill	: $w[].daypart[].temperatureWindChill[(.+.)],
			thunderCategory			: $w[].daypart[].thunderCategory[(.+.)],
			thunderIndex			: $w[].daypart[].thunderIndex[(.+.)],
			uvDescription			: $w[].daypart[].uvDescription[(.+.)],
			uvIndex					: $w[].daypart[].uvIndex[(.+.)],
			windDirection			: $w[].daypart[].windDirection[(.+.)],
			windDirectionCardinal	: $w[].daypart[].windDirectionCardinal[(.+.)],
			windPhrase			 	: $w[].daypart[].windPhrase[(.+.)],
			windSpeed				: $w[].daypart[].windSpeed[(.+.)],
			wxPhraseLong			: $w[].daypart[].wxPhraseLong[(.+.)],
			wxPhraseShort			: $w[].daypart[].wxPhraseShort[(.+.)],
			qpfWidget				: qpfWidget($w[].daypart[].qpf[(.+.)]),
		},
		night: {
			cloudCover				: $w[].daypart[].cloudCover[(.+.+1)],
			dayOrNight				: $w[].daypart[].dayOrNight[(.+.+1)],
			daypartName				: $w[].daypart[].daypartName[(.+.+1)],
			iconCode				: $w[].daypart[].iconCode[(.+.+1)],
			iconCodeExtend			: $w[].daypart[].iconCodeExtend[(.+.+1)],
			narrative				: $w[].daypart[].narrative[(.+.+1)],
			precipChance			: $w[].daypart[].precipChance[(.+.+1)],
			precipType				: $w[].daypart[].precipType[(.+.+1)],
			qpf						: $w[].daypart[].qpf[(.+.+1)],
			qpfSnow					: $w[].daypart[].qpfSnow[(.+.+1)],
			qualifierCode			: $w[].daypart[].qualifierCode[(.+.+1)],
			qualifierPhrase			: $w[].daypart[].qualifierPhrase[(.+.+1)],
			relativeHumidity		: $w[].daypart[].relativeHumidity[(.+.+1)],
			snowRange				: $w[].daypart[].snowRange[(.+.+1)],
			temperature				: $w[].daypart[].temperature[(.+.+1)],
			temperatureHeatIndex	: $w[].daypart[].temperatureHeatIndex[(.+.+1)],
			temperatureWindChill	: $w[].daypart[].temperatureWindChill[(.+.+1)],
			thunderCategory			: $w[].daypart[].thunderCategory[(.+.+1)],
			thunderIndex			: $w[].daypart[].thunderIndex[(.+.+1)],
			uvDescription			: $w[].daypart[].uvDescription[(.+.+1)],
			uvIndex					: $w[].daypart[].uvIndex[(.+.+1)],
			windDirection			: $w[].daypart[].windDirection[(.+.+1)],
			windDirectionCardinal	: $w[].daypart[].windDirectionCardinal[(.+.+1)],
			windPhrase			 	: $w[].daypart[].windPhrase[(.+.+1)],
			windSpeed				: $w[].daypart[].windSpeed[(.+.+1)],
			wxPhraseLong			: $w[].daypart[].wxPhraseLong[(.+.+1)],
			wxPhraseShort			: $w[].daypart[].wxPhraseShort[(.+.+1)],
		}
	}





