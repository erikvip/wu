include "common";
.[] | ( . - 1) as $ad| 
	{
		outlook: {
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
			qpfWidget					: qpfWidget($w[].qpf[.]),
			qpfSnowWidget				: qpfSnowWidget($w[].qpfSnow[.]),	
		},
		day: {
			cloudCover				: $w[].daypart[].cloudCover[(.+.)],
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
			precipChanceWidget		: precipChanceWidget($w[].daypart[].precipChance[(.+.)]),
			qpfWidget				: qpfWidget($w[].daypart[].qpf[(.+.)]),
			qpfSnowWidget			: qpfSnowWidget($w[].daypart[].qpfSnow[(.+.)]),
			cloudCoverWidget		: cloudCoverWidget($w[].daypart[].cloudCover[(.+.)]),
			thunderWidget			: thunderWidget($w[].daypart[].thunderIndex[(.+.)]),
			windWidget				: windWidget($w[].daypart[].windSpeed[(.+.)]; $w[].daypart[].windDirectionCardinal[(.+.)]),
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
			precipChanceWidget		: precipChanceWidget($w[].daypart[].precipChance[(.+.+1)]),
			qpfWidget				: qpfWidget($w[].daypart[].qpf[(.+.+1)]),
			qpfSnowWidget			: qpfSnowWidget($w[].daypart[].qpfSnow[(.+.+1)]),
			cloudCoverWidget		: cloudCoverWidget($w[].daypart[].cloudCover[(.+.+1)]),
			thunderWidget			: thunderWidget($w[].daypart[].thunderIndex[(.+.+1)]),
			windWidget				: windWidget($w[].daypart[].windSpeed[(.+.+1)];$w[].daypart[].windDirectionCardinal[(.+.+1)]),
		},
		
		astroData: {
			WvalidTimeLocal 			: $w[].validTimeLocal[.],
			WvalidTimeUtc 				: $w[].validTimeUtc[.],
			dayIndex					: .,
			dateLocal					: $a[].astroData[$ad].dateLocal,
			visibleLight				: $a[].astroData[$ad].visibleLight,
			lengthOfDay					: $a[].astroData[$ad].lengthOfDay,
			tomorrowDaylightDifference	: $a[].astroData[$ad].tomorrowDaylightDifference,
			yesterdayDaylightDifference	: $a[].astroData[$ad].yesterdayDaylightDifference,
			sun 						: $a[].astroData[$ad].sun,
			# riseSet: {riseLocal:, riseUTC:, setLocal:, setUTC:}
			# twilight:
			#		{civil:, nautical, astronomical:} 
			#			{dawnLocal: dawnUTC: duskLocal:, duskUTC:}
			# zenith: {local:, UTC:}

			moon 						: $a[].astroData[$ad].moon,
			# risetSet: {riseLocal, riseUTC, setLocal, setUTC, riseIcon, risePhase, setIcon, setPhase, percentIlliminated, moonage}
		} 
#	}
	} as $data | (if ( $ad == -1 ) then ( $data | .astroData=null ) else $data end) 
	






