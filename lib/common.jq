def fraction(dec):
	dec as $orig |
	dec//0 | (floor|tostring) as $int | 
	("0."+(.|tostring|split(".")[1]) )| tonumber as $rem |
		(if $int|tonumber > 0 then $int else "" end) +
		(if $rem < 0.05 and $rem > 0.01 then "."+(.|split(".")[1])
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
		( if env._WU_OPT_DECIMAL == "1" then $orig else . end ) |
		( if . == "" then "0" else . end) | tostring + "″" 
	;

def temperatureWidget(low; high):
	(if high == null then "--"
		elif high < 10 and high >= 0 then " " + (high|tostring)
		else high
	end) as $high |

	(if low == null then "--"
		elif low < 10 and low >= 0 then " " + (low|tostring)
		else low
	end) as $low |


	("↑" + ($high // "--"|tostring) + "℉ ↓" + ($low // "--"|tostring) + "℉")
	;
def precipChanceWidget(per):
	(
		(if per == 100 	then "💯 " 
		elif per == null then "-- "
#		elif per < 10 	then " \(per)٪"
#		else 			"\(per)٪" 
		elif per < 10 	then " \(per)%"
		else 			"\(per)%" 

		end)
	)		
	;



#def qpf(amt): $ENV;


#def qpfWidget(amt): "🌧:\(amt) "+fraction(amt);
#def qpfSnowWidget(amt): "❄:\(amt) "+fraction(amt);
#def qpfWidget(amt): ( if amt > 0.05 then "🌧:"+fraction(amt) else s end );

def qpfWidget(amt; always_show_icon): (if amt > 0.00 then "🌧:"+fraction(amt) elif always_show_icon == true then "🌧 :--" else "" end );
def qpfWidget(amt): qpfWidget(amt; false);

def thunderWidget(i):
	(if
		i == 1 then "🌩"
		elif i == 2 then "🗲"
		else " "
	end)
	;

def windWidget(speed; direction):
	(
		(if speed == null then "🌫:-- --"
		elif speed < 10   then "🌬: \(speed) \(direction)"
		else 				   "🌫:\(speed) \(direction)" 
		end)
	)
	;


def qpfSnowWidget(amt): ( if amt > 0.05 then "❄:"+fraction(amt) else "" end );
def cloudCoverWidget(per):
	("⛅" + 
		(if per == 100 then "💯 " 
		elif per == null then "-- "
		elif per < 10 then (" " + (per|tostring) + "%")
		else (per//"--" | tostring + "%")
#		else (per//"--" | tostring + "٪")
		end) 
	)
	;
def moonPhaseWidget(code):
	(if code == "F" 
#		then "🌕"
		then "🌝"
	elif code == "WNC" 
		then "🌘" 
	elif code == "LQ"
		then "🌗"
	elif code == "WNG"
		then "🌖"
	elif code == "N" 
		then "🌚"
#		then "🌑" 
	elif code == "WXC" 
		then "🌒" 
	elif code == "FQ"
		then "🌓"
	elif code == "WXG"
		then "🌔"
	else code 
	end)
	;

def abbr_hms(t): "\(t.hours)h\(t.minutes)m";# \(t.seconds)s";
def abbr_hms: abbr_hms(.);

def rpad(s; len; chr): s + chr * (len - (s|length));
def lpad(s; len; chr): chr * (len - (s|length)) + s;

def rpad(s; len): rpad(s;len;" ");


def parselocaldate:
	( capture("(?<D>[0-9\\-]+)T(?<T>[0-9:]+).(?<ns>[0-9]{3})(?<Z>[0-9:\\-]+)") as {$D, $T, $ns, $Z}
	|"\($D)T\($T)\($Z)"|strptime("%Y-%m-%dT%H:%M:%S%z")|mktime)
;



# replace fromdateiso8601 and fromdate with ones that supports fractional seconds
# NOTE: does not support timezones
# Usage:
# $ jq -n -L . 'include "fromdate"; "2024-02-13T11:10:32.123Z" | fromdate'
# 1707822632.123
#def fromdateiso8601:
#  ( capture("(?<y>\\d+)-(?<m>\\d+)-(?<d>\\d+)T(?<H>\\d+):(?<M>\\d+):(?<S>\\d+)(?<F>\\.\\d+)?Z") as {$y,$m,$d,$H,$M,$S,$F}
#  | [$y,$m,$d,$H,$M,$S,0,0]
#  | map(tonumber)
#  | .[1] |= .-1 # month starts at 0
#  | mktime + ($F | if . then tonumber else 0 end)
#  ) // error("date \"\(.)\" does not match format");
#def fromdate: fromdateiso8601;

#def rpad(s; len; chr):
#	(str | length) as $strlen |
#	len - $strlen|tonumber as $diff |
#	s + chr * (len - (s|length))
#	;

