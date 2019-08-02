var http = require("http");
var url = require("url");

http
  .createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var qdata = q.query;
    let height = 100;
    if (!isNaN(qdata.height)) height = Number(qdata.height);
    let width = height * 0.92;
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.write('<?xml version="1.0" encoding="utf-8"?>\n');

    res.write(
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' +
        width +
        " " +
        height +
        '" style="enable-background:new 0 0 ' +
        width +
        " " +
        height +
        ';" xml:space="preserve">\n'
    );
    res.write('<style type="text/css">\n');
    res.write(".st0{fill:#A3258D;}\n");
    res.write(".st1{fill:none;}\n");
    res.write("</style>\n");

    res.write(
      '<circle cx="' +
        width / 2 +
        '" cy="' +
        (height - width / 2) +
        '" r="1" stroke="#A3258D" class="st0" />\n'
    );

    for (deg = 0; deg < 360; deg++) {
      if (deg % 10 === 0) {
        res.write(
          '<line x1="' +
            width / 2 +
            '" y1="' +
            (height - width + 0.05 * width) +
            '" x2="' +
            width / 2 +
            '" y2="' +
            (height - width + 0.1 * width) +
            '" stroke="#A3258D" transform="rotate(' +
            deg +
            " " +
            width / 2 +
            " " +
            (height - width / 2) +
            ')" />\n'
        );
      } else if (deg % 5 === 0) {
        res.write(
          '<line x1="' +
            width / 2 +
            '" y1="' +
            (height - width + 0.05 * width) +
            '" x2="' +
            width / 2 +
            '" y2="' +
            (height - width + 0.087 * width) +
            '" stroke="#A3258D" transform="rotate(' +
            deg +
            " " +
            width / 2 +
            " " +
            (height - width / 2) +
            ')" />\n'
        );
      } else {
        res.write(
          '<line x1="' +
            width / 2 +
            '" y1="' +
            (height - width + 0.05 * width) +
            '" x2="' +
            width / 2 +
            '" y2="' +
            (height - width + 0.06 * width) +
            '" stroke="#A3258D" transform="rotate(' +
            deg +
            " " +
            width / 2 +
            " " +
            (height - width / 2) +
            ')" />\n'
        );
      }
    }

    res.end("</svg>\n");
  })
  .listen(8080);
