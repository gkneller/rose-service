# rose-service
Node.js service to generate SVG compass rose for nautical charts

The service accepts HTTP Get requests in a format such as:
    <object
      data="http://localhost:8080/?type=chs&height=366&lon=-114&lat=51.03"
      type="image/svg+xml"
    ></object>
    
Available querystring options are:
- type - 'basic' or 'chs'
- height - height of the SVG to produce
- lon - longitude of the rose, for declination calculation
- lat - latitude of the rose, for declination calculation

Declination is calculated when lon and lat are specified in the querystring by a call to the NOAA geomagnetic calculator service, https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml?useFullSite=true.

The geomagnetic model used is IGRF.
