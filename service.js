/**
 * @fileoverview Service to return SVG for compass rose
 * @author geoff@pocketconnections.com (Geoff Kneller)
 * @copyright 2019
 */

var http = require("http");
var url = require("url");
var basic = require("./basic.js");
var chs = require("./chs.js");
var rp = require("request-promise");

const port = 8080;

/**
 * Create the server and listen on the default port
 * URI parameters are:
 * - height - height of the SVG, default '100'
 * - type - type of the SVG, default 'basic'
 * - lon - longitude of the SVG for declination calc
 * - lat - latitude of the SVG for declination calc
 */
http
  .createServer(async function(req, res) {
    // Parse the query string
    var q = url.parse(req.url, true);
    var qdata = q.query;

    // height parameter
    let height = 100;
    if (!isNaN(qdata.height)) height = Number(qdata.height);

    // type parameter
    let type = "basic";
    if (qdata.type) type = qdata.type;

    // lon parameter
    let lon = 0;
    if (qdata.lon) {
      if (!isNaN(qdata.lon)) lon = Number(qdata.lon);
    }

    // lat parameter
    let lat = 0;
    if (qdata.lat) {
      if (!isNaN(qdata.lat)) lat = Number(qdata.lat);
    }

    // Calculate declination
    let d = 0;
    let c = 0;
    let y = "";
    if (qdata.lon && qdata.lat) {
      var options = {
        uri:
          "http://ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=" +
          lat +
          "&lon1=" +
          lon +
          "&model=IGRF&resultFormat=json",
        json: true
      };
      await rp(options)
        .then(function(decObject) {
          d = Number(decObject.result[0].declination);
          c = Number(decObject.result[0].declnation_sv);
          year = Number(decObject.result[0].date);
          year = Math.trunc(year);
          y = year.toString();
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    // Switch on the type
    let svg = "";
    if (type === "basic") {
      try {
        svg = basic.rose(height);
      } catch (err) {
        console.log(err.message);
      }
    } else if (type === "chs") {
      try {
        svg = chs.rose(height, d, c, y);
        console.log(svg);
      } catch (err) {
        console.log(err.message);
      }
    }

    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.write('<?xml version="1.0" encoding="utf-8"?>\n');
    res.write(svg);
    res.end("\n");
  })
  .listen(port);
