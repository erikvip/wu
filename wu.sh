#!/bin/bash

set -o nounset  # Fail when access undefined variable
set -o errexit  # Exit when a command fails

BASEDIR=$(dirname `realpath $0`);
_WU_DEFAULT_CITY="post-mountain";
_WU_DEFAULT_STATE="ca";
_WU_TEMPLATE="text";

_loc=${1:-$_WU_DEFAULT_CITY}; 
_state=${2:-$_WU_DEFAULT_STATE}; 

# Gather weather data from wunderground and parse
fetch_data() {
	#wget -q --show-progress --progress=bar --user-agent="Chrome" -O "data/${_loc}" "https://www.wunderground.com/forecast/us/${_state}/${_loc}"
	wget -q --user-agent="Chrome" -O "data/${_loc}" "https://www.wunderground.com/forecast/us/${_state}/${_loc}"


	cat "data/${_loc}" \
		| egrep -o '<script [^>]*type="application/json">.*</script>' \
		| sed 's/<[^>]*>//g' \
		| sed 's/\&q\;/"/g' \
		| jq '.[][] as $d | $d | select(type == "object") as $o | select( .url | ( contains("/v3/wx/","/v2/pws")  ) ) as $i | $i.url | ( split("?") | .[0] | split("/")[3:8] | join("/")) as $type | {"type":"\($type)", "data":$i.value} as $done | $done' \
		| jq --slurp '.' \
		> "data/${_loc}.json"

	#rm "data/${_loc}";

	cat "data/${_loc}.json" \
		| jq -r '.[] | select(.type=="v3/wx/forecast/daily/10day") | .data' \
		> "data/v3-wx-forecast-daily-10day.${_loc}.json"

#	cat "data/${_loc}.json" \
#		| jq -r '.[] | select(.type=="v3/wx/forecast/hourly/15day") | .data' \
#		> "data/v3-wx-forecast-hourly-15day.${_loc}.json"


}

show_forecast() {

	echo '[0,1,2,3,4,5,6,7,8,9,10]' \
		| jq  \
		    --slurpfile w "${BASEDIR}/data/v3-wx-forecast-daily-10day.${_loc}.json" \
		    -f "${BASEDIR}/tpl/forecast-daily-10day.txt.js"  \
		| jq -s . > "${BASEDIR}/data/${_loc}.forecast.json"

		cat "${BASEDIR}/data/${_loc}.forecast.json" \
		| jq -r -f "${BASEDIR}/tpl/forecast-template.text.js" \
		| column -s',' -t		
}

main() {

	if [ ! -e "data/${_loc}.json" ]; then
		fetch_data
	fi
		
	# Check expiration of locally cached weather data
	_exp=$(cat data/${_loc}.json | jq '[ .[] | select(.type=="v3/wx/observations/current") | .data .expirationTimeUtc ] | max');
	if [[ "$_exp" < `date --utc '+%s'` ]]; then	
		stderr "Data expired for ${_loc}"
	#	rm "data/${_loc}*"
		fetch_data
	fi

	show_forecast
}





# Write messages to stderr
stderr() {
	local _msg="$@";
	(>&2 echo "${_msg}")
}


main
exit 0

#if [ ! -e "data/${_loc}.json" ]; then
#	./parse.sh
#fi

#_exp=$(cat data/${_loc}.json | jq '[ .[] | select(.type=="v3/wx/observations/current") | .data .expirationTimeUtc ][0]');

#echo "Expiration: $_exp";

#if [[ "$_exp" -le `date '+%s'` ]]; then
	#echo "EXPIRED";
	#./parse.sh -n
#fi
