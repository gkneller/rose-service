/**
 * @fileoverview Prepares SVG string for a basic compass rose
 * @author geoff@pocketconnections.com (Geoff Kneller)
 * @copyright 2019
 */

/**
 * Returns strng containing SVG for a basic compass rose.
 * @param {number} height - height of the SVG to produce
 * @return {string} String containing the SVG
 * @throws {TypeError} Argument height must be a non-empty number.
 * @throws {RangeError} Argument height must be > 0.
 */
exports.rose = function(height) {
  // Input validation
  if (height == "") throw new TypeError("Empty");
  if (isNaN(height)) throw new TypeError("Not a number");
  const h = Number(height);
  if (h <= 0) throw new RangeError("Height cannot be <= 0");

  // This svg will be square
  const w = h;
  const r = w / 2;

  // Default stroke colour is black
  const s = "black";

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

  // Thick circle 64% of radius
  result +=
    '<circle cx="' +
    r +
    '" cy="' +
    r +
    '" r="' +
    0.64 * r +
    '" stroke="' +
    s +
    '" stroke-width="' +
    0.05 * r +
    '" />\n';

  // Thin circle 55% of radius
  result +=
    '<circle cx="' +
    r +
    '" cy="' +
    r +
    '" r="' +
    0.55 * r +
    '" stroke="' +
    s +
    '" stroke-width="1" />\n';

  // Close SVG tag
  result += "</svg>\n";

  // Return result
  return result;
};
