include "common";
(.[] | select(.type=="v3/wx/forecast/daily/10day") | .data ) as $daily |
(.[] | select(.type=="v3/wx/forecast/hourly/15day") | .data ) as $hourly |
$dailyh
