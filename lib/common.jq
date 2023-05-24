def fraction(dec):
	dec//0 | (floor|tostring) as $int | 
	("0."+(.|tostring|split(".")[1]) )| tonumber as $rem |
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
		( if . == "" then "0" else . end) | tostring + "″"
	;

def temperatureWidget(low; high):
	("↑" + (high // "--"|tostring) + "℉ ↓" + (low // "--"|tostring) + "℉")
	;
def precipChanceWidget(per):
	(
		(if per == 100 	then "💯 " 
		elif per == null then "-- "
		elif per < 10 	then " \(per)٪"
		else 			"\(per)٪" 
		end)
	)		
	;

#def qpfWidget(amt): "🌧:\(amt) "+fraction(amt);
def qpfWidget(amt): ( if amt > 0.05 then "🌧:"+fraction(amt) else "" end );
#def qpfSnowWidget(amt): "❄:\(amt) "+fraction(amt);
def qpfSnowWidget(amt): ( if amt > 0.05 then "❄:"+fraction(amt) else "" end );
def cloudCoverWidget(per):
	("⛅" + 
		(if per == 100 then "💯 " 
		elif per == null then "-- "
		else (per//"--" | tostring + "٪")
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
