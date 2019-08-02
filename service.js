/**
 * @fileoverview Service to return SVG for compass rose
 * @author geoff@pocketconnections.com (Geoff Kneller)
 * @copyright 2019
 */

var http = require("http");
var url = require("url");
var basic = require("./basic.js");

/**
 * Create the server and listen on the default port
 * URI parameters are:
 * - height - height of the SVG, default '100'
 * - type - type of the SVG, default 'basic'
 */
http
  .createServer(function(req, res) {
    // Parse the query string
    var q = url.parse(req.url, true);
    var qdata = q.query;

    // height parameter
    let height = 100;
    if (!isNaN(qdata.height)) height = Number(qdata.height);

    // type parameter
    let type = "basic";
    if (qdata.type) type = qdata.type;

    // Switch on the type
    let svg = "";
    if (type === "basic") {
      try {
        svg = basic.rose(height);
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
  .listen(8080);
