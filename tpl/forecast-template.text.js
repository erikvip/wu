include "common";

.[] | moonPhaseWidget(.moonPhaseCode)
+ "\(.validTimeUtc|strftime("%d %a"))" +
" \(.temperatureWidget) ⌮  \(.qpfWidget)\(.qpfSnowWidget)"
+",㏂\(.day.cloudCoverWidget) \(.day.precipChanceWidget) \(.day.qpfWidget)\(.day.qpfSnowWidget)"
+",🌫:\(.day.windSpeed) \(.day.windDirectionCardinal)"
+",㏘\(.night.cloudCoverWidget) \(.night.precipChanceWidget) \(.night.qpfWidget)\(.night.qpfSnowWidget)"
+",🌫:\(.night.windSpeed) \(.night.windDirectionCardinal)"
