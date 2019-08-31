/**
 * @fileoverview Prepares SVG string for a CHS compass rose
 * @author geoff@pocketconnections.com (Geoff Kneller)
 * @copyright 2019
 */

/**
 * Returns string containing SVG for a CHS compass rose.
 * @param {number} height - height of the SVG to produce
 * @param {number} dec - declination, dd
 * @param {number} change - annual change, dd
 * @param {string} year - year of declination calc
 * @return {string} String containing the SVG
 * @throws {TypeError} Argument height must be a non-empty number.
 * @throws {RangeError} Argument height must be > 0.
 */
exports.rose = function(height, dec, change, year) {
  // Input validation
  if (height == "") throw new TypeError("Empty");
  if (isNaN(height)) throw new TypeError("Not a number");
  const h = Number(height);
  if (h <= 0) throw new RangeError("Height cannot be <= 0");

  // Declination
  const d = Number(dec);

  // This svg will be a rectangle
  const w = 0.915 * h;

  // Center of the rose in the X direction
  const cx = w / 2;

  // Center of the rose in the Y direction
  const cy = 0.533 * h;

  // Default stroke colour is magenta
  const s = "#A3258D";

  // Start with an empty result string
  result = "";

  // SVG tag
  result +=
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    'x="0px" y="0px" viewBox="0 0 ' +
    w +
    " " +
    h +
    '" ' +
    'style="enable-background:new 0 0 ' +
    w +
    " " +
    h +
    ';" ' +
    'xml:space="preserve">\n';

  // Center point
  result +=
    '<circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="0.5" stroke="' +
    s +
    '" fill="' +
    s +
    '" />\n';

  // Center circle
  const rc = 0.009 * w;
  result +=
    '<circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="' +
    rc +
    '" stroke="' +
    s +
    '" fill="none" />\n';

  // True rose
  const rt = 0.448 * w;

  // Loop through degrees
  for (deg = 0; deg < 360; deg++) {
    // Major degrees
    if (deg % 10 === 0) {
      result +=
        '<line x1="' +
        cx +
        '" y1="' +
        (cy - 0.39 * w) +
        '" x2="' +
        cx +
        '" y2="' +
        (cy - rt) +
        '" stroke="' +
        s +
        '" transform="rotate(' +
        deg +
        " " +
        cx +
        " " +
        cy +
        ')"/>\n';
    } // 10
    // Medium degrees
    else if (deg % 5 === 0) {
      result +=
        '<line x1="' +
        cx +
        '" y1="' +
        (cy - 0.415 * w) +
        '" x2="' +
        cx +
        '" y2="' +
        (cy - rt) +
        '" stroke="' +
        s +
        '" transform="rotate(' +
        deg +
        " " +
        cx +
        " " +
        cy +
        ')"/>\n';
    } // 5
    // Minor degrees
    else {
      result +=
        '<line x1="' +
        cx +
        '" y1="' +
        (cy - 0.433 * w) +
        '" x2="' +
        cx +
        '" y2="' +
        (cy - rt) +
        '" stroke="' +
        s +
        '" transform="rotate(' +
        deg +
        " " +
        cx +
        " " +
        cy +
        ')"/>\n';
    } // 1

    // Labels
    if (deg % 10 === 0 && (deg <= 90 || deg >= 270)) {
      result +=
        '<text x="' +
        cx +
        '" y="' +
        (cy - rt - 2) +
        '" font-family="sans-serif" font-size="' +
        w * 0.015 +
        '" text-anchor="middle" fill="' +
        s +
        '" transform="rotate(' +
        deg +
        " " +
        cx +
        " " +
        cy +
        ')" >' +
        deg +
        "</text>\n";
    } // Labels 270-90
    else if (deg % 10 === 0) {
      result +=
        '<text x="' +
        cx +
        '" y="' +
        (cy + rt + 2) +
        '" font-family="sans-serif" font-size="' +
        w * 0.015 +
        '" text-anchor="middle" dominant-baseline="text-before-edge" fill="' +
        s +
        '" transform="rotate(' +
        (deg - 180) +
        " " +
        cx +
        " " +
        cy +
        ')" >' +
        deg +
        "</text>\n";
    } // Labels 100-260
  } // end for

  // Star
  result +=
    '<polygon points="' +
    cx +
    "," +
    h * 0.0273 +
    " " + // 1
    w * 0.507 +
    "," +
    h * 0.0464 +
    " " + // 2
    w * 0.528 +
    "," +
    h * 0.0464 +
    " " + // 3
    w * 0.512 +
    "," +
    h * 0.0601 +
    " " + // 4
    w * 0.517 +
    "," +
    h * 0.0792 +
    " " + // 5
    cx +
    "," +
    h * 0.0683 +
    " " + // 6
    w * 0.483 +
    "," +
    h * 0.0792 +
    " " + // 7
    w * 0.489 +
    "," +
    h * 0.0601 +
    " " + // 8
    w * 0.472 +
    "," +
    h * 0.0464 +
    " " + // 9
    w * 0.493 +
    "," +
    h * 0.0464 +
    '" style="stroke:' +
    s +
    ';fill:none;" />\n';
  result +=
    '<line x1="' +
    cx +
    '" y1="' +
    h * 0.0683 +
    '" x2="' +
    cx +
    '" y2="' +
    h * 0.0902 +
    '" stroke="' +
    s +
    '" />\n';

  // Magnetic rose
  const rm = 0.282 * w;
  for (deg = 0; deg < 360; deg++) {
    let v = deg + d;

    // Four cardinal point lines
    if (deg % 90 === 0) {
      result +=
        '<line x1="' +
        cx +
        '" y1="' +
        (cy - rc) +
        '" x2="' +
        cx +
        '" y2="' +
        (cy - rm - 0.015 * w) +
        '" stroke="' +
        s +
        '" transform="rotate(' +
        v +
        " " +
        cx +
        " " +
        cy +
        ')"/>\n';
    } // 90

    // Major degrees
    else if (deg % 10 === 0) {
      result +=
        '<line x1="' +
        cx +
        '" y1="' +
        (cy - rm) +
        '" x2="' +
        cx +
        '" y2="' +
        (cy - rm - 0.015 * w) +
        '" stroke="' +
        s +
        '" transform="rotate(' +
        v +
        " " +
        cx +
        " " +
        cy +
        ')"/>\n';
    } // 10
    // Medium degrees
    else if (deg % 5 === 0) {
      result +=
        '<line x1="' +
        cx +
        '" y1="' +
        (cy - rm) +
        '" x2="' +
        cx +
        '" y2="' +
        (cy - rm - 0.012 * w) +
        '" stroke="' +
        s +
        '" transform="rotate(' +
        v +
        " " +
        cx +
        " " +
        cy +
        ')"/>\n';
    } // 5
    // Minor degrees
    else {
      result +=
        '<line x1="' +
        cx +
        '" y1="' +
        (cy - rm) +
        '" x2="' +
        cx +
        '" y2="' +
        (cy - rm - 0.003 * w) +
        '" stroke="' +
        s +
        '" transform="rotate(' +
        v +
        " " +
        cx +
        " " +
        cy +
        ')"/>\n';
    } // 1

    // Labels
    if (deg % 30 === 0 && deg != 0 && (deg <= 90 || deg >= 270)) {
      result +=
        '<text x="' +
        cx +
        '" y="' +
        (cy - 1 - rm - 0.015 * w) +
        '" font-family="sans-serif" font-size="' +
        w * 0.013 +
        '" text-anchor="middle" fill="' +
        s +
        '" transform="rotate(' +
        v +
        " " +
        cx +
        " " +
        cy +
        ')" >' +
        deg +
        "</text>\n";
    } // Labels 270-90
    else if (deg % 30 === 0 && deg > 0) {
      result +=
        '<text x="' +
        cx +
        '" y="' +
        (cy + 1 + rm + 0.015 * w) +
        '" font-family="sans-serif" font-size="' +
        w * 0.013 +
        '" text-anchor="middle" dominant-baseline="text-before-edge" fill="' +
        s +
        '" transform="rotate(' +
        (v - 180) +
        " " +
        cx +
        " " +
        cy +
        ')" >' +
        deg +
        "</text>\n";
    } // Labels 100-260
  } // end for

  // Declination label
  let strDec = Math.trunc(d).toString();
  strDec = strDec.padStart(3, "0");
  if (d % 1 >= 0.5) strDec += " \xBD";
  strDec += "\xB0";
  if (d >= 0) {
    strDec += "E ";
  } else {
    strDec += "W ";
  }
  strDec += year;

  // Annual change, convert to DMS
  var dc = Math.floor(Math.abs(change));
  var minfloat = (Math.abs(change) - dc) * 60;
  var mc = Math.floor(minfloat);
  var mdir = "E";
  if (change < 0) mdir = "W";
  var secfloat = (minfloat - mc) * 60;
  var sc = Math.round(secfloat);
  if (sc == 60) {
    mc++;
    sc = 0;
  }
  if (mc == 60) {
    dc++;
    mc = 0;
  }
  strDec += " (" + mc + "'" + mdir + ")";

  // Label
  if (change > 0) {
    result +=
      '<text x="' +
      (cx + 0.005 * w) +
      '" y="' +
      (cy - rm / 2) +
      '" font-family="sans-serif" font-size="' +
      w * 0.015 +
      '" text-anchor="middle" fill="' +
      s +
      '" transform="rotate(' +
      d +
      " " +
      cx +
      " " +
      cy +
      ')" writing-mode="tb" glyph-orientation-vertical="90">' +
      strDec +
      "</text>\n";
  } else {
    result +=
      '<text x="' +
      (cx + rm / 2) +
      '" y="' +
      (cy - 0.005 * w) +
      '" font-family="sans-serif" font-size="' +
      w * 0.015 +
      '" text-anchor="middle" fill="' +
      s +
      '" transform="rotate(' +
      (d - 90) +
      " " +
      cx +
      " " +
      cy +
      ')" >' +
      strDec +
      "</text>\n";
  }
  // Magnetic north arrow
  result +=
    '<line x1="' +
    cx +
    '" y1="' +
    (cy - rm) +
    '" x2="' +
    cx +
    '" y2="' +
    (cy - 0.38 * w) +
    '" stroke="' +
    s +
    '" transform="rotate(' +
    d +
    " " +
    cx +
    " " +
    cy +
    ')"/>\n';

  result +=
    '<line x1="' +
    cx +
    '" y1="' +
    (cy - 0.38 * w) +
    '" x2="' +
    (cx + 0.02 * w) +
    '" y2="' +
    (cy - 0.34 * w) +
    '" stroke="' +
    s +
    '" transform="rotate(' +
    d +
    " " +
    cx +
    " " +
    cy +
    ')"/>\n';

  result +=
    '<line x1="' +
    (cx + 0.02 * w) +
    '" y1="' +
    (cy - 0.34 * w) +
    '" x2="' +
    cx +
    '" y2="' +
    (cy - 0.32 * w) +
    '" stroke="' +
    s +
    '" transform="rotate(' +
    d +
    " " +
    cx +
    " " +
    cy +
    ')"/>\n';

  // Close SVG tag
  result += "</svg>\n";

  return result;
};
