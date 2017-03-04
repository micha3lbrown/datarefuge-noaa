# Scrape NOAA Daily Climate Report
**Archival UID: C4584E6C-7CA8-465B-A836-258378EA04D1**

This may be over engineered, but this was the best solution I could find in a relatively short amount of time.

### NOAA URL parameter reference
Given: `http://w2.weather.gov/climate/getclimate.php?date=&wfo=box&sid=BOS&pil=CF6&recent=yes&specdate=2017-03-31+11%3A11%3A11`

| param  | name | values/examples   |
|--------|------|-------------------|
| `sid` | site id | BOS, BDL, PVD, OHR |
| `pil` | data type | CLI, CF6, RER, CLM, RTP, CLS, CLA |
| `specdate` | date |2017-03-31+11%3A11%3A11 |

side note: `%3A` is the URL character for colon.

### Part I Javascript
1. Navigate to [NOAA Daily Climate Report Page](http://w2.weather.gov/climate/index.php?wfo=box)
2. Select Daily Climate Report - > Boston - > Most Recent -> Click GO. (This should open in a new window.)
3. In Chrome right click on body, select "Inspect Page Source" and navigate to the console tab.
4. Run the following Javascript
```
var uriArray = [];
for(i=1; i<=336; i++) {
  var rawDate = document.getElementsByName("specdate")[0].children[i].value;
  uriDate = rawDate.replace(/ /g,"+");
  uriDate = uriDate.replace(/:/g,"%3A");
  uriArray.push(uriDate);
}
console.log(uriArray);
```
5. This provides us with all available date queries that we can use to formulate appropriate URLs that we will query with Ruby. To copy this date array into your paste buffer, run `copy(dateArray);` from the Chrome console tab.

### Part II Ruby
Now that we have the `dateArray` from completing the Javascript section above, we can now run a Ruby script that will use Net::HTTP to request and Nokogiri to parse the response.
1. Update `date_array` with `dateArray` from the JS section.
2. Ensure that `Nokogiri` and `net/http` are installed and accessible from your currently running ruby environment
3. `chmod +x ./scrape_generated_urls.rb`
4. `open ./tools/tmp/2017-01-04+XXXXXX.html` to verify data
5. If the data looks good, move data from `./tools/tmp` -> `./data`
