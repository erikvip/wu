#!/bin/bash
export _WU_OPT_DECIMAL=1;
cat data/v3-wx-forecast-hourly-15day.ca-post-mountain.json  | \
	jq --arg opts "{}" -r -f lib/forecast-hourly.js

