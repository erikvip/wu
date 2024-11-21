#!/bin/bash
export _WU_OPT_DECIMAL=1;
cat data/v3-wx-forecast-hourly-15day.ca-post-mountain.json  | \
	jq --arg opts "{}" -r -f lib/forecast-hourly.js
  #jq --arg opts "{}" -r -f tpl/forecast-hourly.js


#cat data/v3-wx-forecast-hourly-15day.ca-post-mountain.json  | \
#	jq '. as $root | .qpfSnow[0:24] | @sh'



#cat data/v3-wx-forecast-hourly-15day.ca-mad-river.json  | jq  'include "common";. as $root | (.validTimeLocal[0:24] | to_entries | map(.key)) | map( ($root.validTimeLocal[.]|strptime("%Y-%m-%dT%H:%M:%S%Z")|mktime|strftime("%H%p: ")) + (cloudCoverWidget($root.cloudCover[.]) ) + ( precipChanceWidget($root.precipChance[.]) ) + ( qpfWidget($root.qpf[.])) + ( qpfSnowWidget($root.qpfSnow[.]) ) )'



exit 

[
  "cloudCover",
  "dayOfWeek",
  "dayOrNight",
  "expirationTimeUtc",
  "iconCode",
  "iconCodeExtend",
  "precipChance",
  "precipType",
  "pressureMeanSeaLevel",
  "qpf",
  "qpfSnow",
  "relativeHumidity",
  "temperature",
  "temperatureDewPoint",
  "temperatureFeelsLike",
  "temperatureHeatIndex",
  "temperatureWindChill",
  "uvDescription",
  "uvIndex",
  "validTimeLocal",
  "validTimeUtc",
  "visibility",
  "windDirection",
  "windDirectionCardinal",
  "windGust",
  "windSpeed",
  "wxPhraseLong",
  "wxPhraseShort",
  "wxSeverity"
]
